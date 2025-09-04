from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from model import get_llm
from book_worker import book_task,book_task_super
from search_work import searching
llm = get_llm()

supervisor_prompt = PromptTemplate.from_template("""
You are a supervisor that routes requests.

Workers:
- Query Worker: For general queries, listing, filtering, or explaining data,searching,filtering users,showing users.
- API Worker: For taking action, booking, canceling, or calling APIs.

Rules:
1. Decide only one worker.
2. Use conversation history to resolve references (like "first one" or "book it").
3. Respond with JSON only: {{"chosen_worker": "query" or "api"}}

Conversation history:
{history}

User: {user_message}
""")

supervisor_chain = LLMChain(llm=llm, prompt=supervisor_prompt)
def supervisor(history, user_message):
    decision = supervisor_chain.run({
        "history": history,
        "user_message": user_message
    })
    return decision 
import json
import json
import json

async def surpervisor_work(history, user_message,data=None,logged_user_id=None):
    try:

        # print("op",user_message,history)
        print("logged_useer_id",logged_user_id)
        # Run supervisor chain (always use invoke for multi-inputs)
        decision_raw = supervisor_chain.invoke({
            "history": history,
            "user_message": user_message
        })

        # Handle case where decision_raw is dict with "text"
        if isinstance(decision_raw, dict) and "text" in decision_raw:
            decision_raw = decision_raw["text"]

        # Now clean and parse the JSON
        if isinstance(decision_raw, str):
            try:
                decision = json.loads(decision_raw)
            except Exception:
                cleaned = (
                    decision_raw.strip()
                    .removeprefix("```json")
                    .removesuffix("```")
                    .strip()
                )
                decision = json.loads(cleaned)
        else:
            decision = decision_raw  # Already dict
        # print(f"Supervisor on real data -> {history} , with message {user_message}")

        print(f"Supervisor decision: {decision}")

        worker = decision["chosen_worker"]  # <- safe now
        if worker == "query":
            return searching(user_message)
        elif worker == "api":
            return await book_task_super(user_message, data,logged_user_id)
        else:
            return {
                "error": "Invalid worker chosen",
                "msg": "Please check the supervisor work."
            }

    except Exception as e:
        print(f"Error in supervisor_work: {e}")
        return {"error": "Supervisor failure", "msg": str(e)}
