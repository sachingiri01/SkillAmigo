import json
import requests
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from model import get_llm
from agent import got_only_search_collab
from book_worker import book_task_collab
from hit_wroker import hit_collaborator

llm = get_llm()

# --- Prompt for expansion ---
expander_prompt = PromptTemplate.from_template("""
You are an expert planner that expands user requests into relevant categories 
and also generates a polite, helpful message for the user.

Available categories:
{categories}

Rules:
0: You can select atmost only 5, always try to not repeat the categories all must be unique so select which is best outcome must very important rule
1. Only choose from the given categories.
2. Pick all categories that are relevant to the user request.
3. Rank them in logical order (most relevant first).
4. Write a short, kind, collaborative message explaining what we can do to help.
5. Always return JSON only in this format:
   {{
      "chosen_categories": ["cat1", "cat2", "cat3"],
      "message": "Some nice, polite message for the user"
   }}

User request: {user_query}
""")

expander_chain = LLMChain(llm=llm, prompt=expander_prompt)

# --- Prompt for decision making ---
# decision_prompt = PromptTemplate.from_template("""
# You are a task decider for SkillAmigo.

# Decide the user intent based on their message.

# Rules:
# - If the user says anything that sounds like **booking, reserving, hiring, or confirming** (e.g., 
#   "book this", "book all", "book the first one", "reserve that", "I’ll take it", 
#   "schedule this", "hire them"), then classify as:
#   {{"action": "book"}}

# - If the user says anything that sounds like **exploring, asking, or searching** (e.g., 
#   "show me options", "search decorators", "what can you do", "suggest something", 
#   "find me plumbers"), then classify as:
#   {{"action": "collaborate"}}

# Return JSON strictly in this format:
# {{
#    "action": "book" OR "collaborate"
# }}

# User request: {user_query}
# history : {history}
                                        
# """)
decision_prompt = PromptTemplate.from_template("""
You are a task decider for SkillAmigo.

Decide the user intent based on their message and the given history.

Rules:
- If the user says anything that sounds like **booking, reserving, hiring, or confirming** (e.g., 
  "book this", "book all", "book the first one", "reserve that", "I’ll take it", 
  "schedule this", "hire them"), then classify as:
  {{"action": "book"}}

- If the user says anything that sounds like **exploring, asking, or searching** (e.g., 
  "show me options", "search decorators", "what can you do", "suggest something", 
  "find me plumbers"), then classify as:
  {{"action": "collaborate"}}

- Use the `history` to correctly resolve references like "first one", "second one", "last one".
  Do not change the action type, just ensure you interpret references with history context.

Return JSON strictly in this format:
{{
   "action": "book" OR "collaborate"
}}

User request: {user_query}
History: {history}
""")

decision_chain = LLMChain(llm=llm, prompt=decision_prompt)


# --- Fetch categories from API ---
async def fetch_categories(ap=None):
    try:
        data = hit_collaborator()
        return data 
    except Exception as e:
        print(f"❌ Error fetching categories: {e}")
        return []


import json

async def expand_query(user_query, history,logged_user_id=None):
    print("organizer")
    try:
        # Step 1: Decide what to do
        decision_raw = decision_chain.invoke({"user_query": user_query, "history": history})
        if isinstance(decision_raw, dict) and "text" in decision_raw:
            decision_raw = decision_raw["text"]

        print("raw decision : ", decision_raw)

        # Clean decision string if needed
        if isinstance(decision_raw, str):
            cleaned = (
                decision_raw.strip()
                .removeprefix("```json")
                .removesuffix("```")
                .strip()
            )
            try:
                decision = json.loads(cleaned)
            except:
                decision = {"action": "collaborate"}
        else:
            decision = decision_raw  # already dict

        print("Decision: ", decision)

        # Step 2: If booking, call book_task_collab
        if decision.get("action") == "book":
            return await book_task_collab(user_query, history,logged_user_id)

        # Step 3: If collaborate, expand categories
        categories =[]
        catt = await fetch_categories()
        if catt['success']:

               # checks boolean True
            categories = catt.get('message', [])
        else:
           return {
        "chosen_categories": [],
        "message": "Something went wrong, please try again.",
        "data": []
    }

        if not categories:
            return {"chosen_categories": [], "message": "Sorry, no categories found.", "data": []}

        raw = expander_chain.invoke({
            "user_query": user_query,
            "categories": ", ".join(categories)
        })

        if isinstance(raw, dict) and "text" in raw:
            raw = raw["text"]

        # Clean expander output
        if isinstance(raw, str):
            cleaned = (
                raw.strip()
                .removeprefix("```json")
                .removesuffix("```")
                .strip()
            )
            try:
                result = json.loads(cleaned)
            except Exception as e:
                print(f"❌ Error parsing expander result: {e}")
                result = {"chosen_categories": [], "message": "Could not parse response."}
        else:
            result = raw

        # Ensure message exists
        if "message" not in result:
            result["message"] = "Here’s what we can do to help you with your request."

        # Attach search results
        result["data"] = []
        if result.get("chosen_categories"):
            for c in result["chosen_categories"]:
                try:
                    data = await got_only_search_collab(c)
                    result["data"].append(data)
                except Exception as e:
                    print(f"❌ Error fetching search results for {c}: {e}")

        return result

    except Exception as e:
        print(f"❌ Error in expand_query: {e}")
        return {
            "chosen_categories": [],
            "message": "Something went wrong, please try again.",
            "data": []
        }
