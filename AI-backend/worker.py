from fastapi import FastAPI
from pydantic import BaseModel
import requests
import os
import json
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from model import get_llm
from dotenv import load_dotenv
load_dotenv();
import os

BACKEND_URL = os.getenv("BACKEND_URL", "http://127.0.0.1:8000/api")  # fallback if env not set

apis = [
    {
        "name": "search_user",
        "description": "Search for users by name, skill, or location.",
        "method": "POST",
        "url": f"{BACKEND_URL}/users/search",
        "body_schema": {
            "query": "string",   # e.g. 'Sachin' or 'Web Developer'
            "filters": "object"  # e.g. {"location": "Delhi"}
        }
    },
    {
        "name": "book_gig",
        "description": "Book a gig or freelance job for the user.",
        "method": "POST",
        "url": f"{BACKEND_URL}/ai-booking",
        "body_schema": {
            "gigId": "string",
            "user_id": "string this will be logged_user_id",
            "coin":"this is given as avg_price in gigs data",

        }
    },
    {
        "name": "get_user_profile",
        "description": "Fetch detailed profile information of a user.",
        "method": "POST",
        "url": f"{BACKEND_URL}/users/profile",
        "body_schema": {
            "user_id": "string"
        }
    },
    {
        "name": "list_gigs",
        "description": "Retrieve a list of available gigs matching filters.",
        "method": "POST",
        "url": f"{BACKEND_URL}/gigs/list",
        "body_schema": {
            "category": "string",
            "location": "string optional",
            "price_range": "string"
        }
    },
    {
        "name": "cancel_booking",
        "description": "Cancel a previously booked service or gig.",
        "method": "POST",
        "url": f"{BACKEND_URL}/booking/gigid",
        "body_schema": {
            "booking_id": "string",
            "user_id": "string",
            "reason": "string optional"
        }
    }
]



# system_prompt = """
# You are SkillAmigo's AI Agent.
# You have the following APIs available:
# {apis}

# For each user request, choose the most suitable API from the above list. 
# Return ONLY valid JSON in the following format:
# if u think the user request is not related to any of the above APIs, return:
# {{
#   "error": "Request not related to any available API",
#     "user_id": "<string>"
#     "suceess": false,
#     "msg": "Antything u think  but not more than 20 words"
#   }}
# if u think the user request is related to one of the above APIs, return:
# {{
#   "api_url": "<string>",
#   "body": {{ ... }},   // body must match schema of chosen API
#   "user_id": "<string>"
#   "suceess": false,
# }}

# {{
# this is your privious response to the user: {history}
# }}
# """
system_prompt = """
You are SkillAmigo's AI Agent.
You have the following APIs available:
{apis}

Rules:
1. The variable "history" is a list of objects containing gig or user details. 
   Example: history = [
       {{"gigid": "1", "user_id": 1}},
       {{"gigid": "2", "user_id": 2}}
   ]
   Each entry represents a previously listed gig or user.
2. The user message may reference items in the history using phrases like 
   "first one", "second one", "last one", "book it", "cancel that", etc.
   - "first one" → history[0]
   - "second one" → history[1]
   - "last one" → history[-1]
   You must resolve these references to the correct entry from history.
3. Always choose the most relevant API from the provided list.
4. Always construct the API body using the chosen data from history + the user’s request.
   Example:
   If user says "book first one", 
   and history = [{{"gigId": "1", "user_id": 1...}}, {{"gigId": "2", "user_id": 2...}}],
   then you must output a booking request with gig_id="1" and user_id=1.
5. Return ONLY valid JSON in one of the following formats:
And this is the logged_user_id -> {logged_user_id}
If the request is not related to any available API:
{{
  "error": "Request not related to any available API",
  "user_id": "<string or null>",
  "success": false,
  "msg": "Anything you think but not more than 20 words"
}}

If the request is related to one of the available APIs:
{{
  "api_url": "<string>",
  "body": {{ ... }},   // body must match schema of chosen API
  "user_id": "<string>",
  "success": true
}}

This is your previous context/history: {history}
"""
collab_prompt = """
You are SkillAmigo's AI Agent.
You have the following APIs available:
{apis}
And this is the logged_user_id -> {logged_user_id}
Rules:
1. The variable "history" is a list of objects containing gig or user details. 
   Example: history = [
       list of data with the detaild that we need for api 
   ]

2. The user message may reference items in history using phrases like:
   - "first one" → history[0]
   - "second one" → history[1]
   - "third one" → history[2]
   - "last one" → history[-1]
   - "book all or book" → all items in history
   - "book 2 and 3" → history[1] and history[2]

3. Always resolve these references to the correct gig(s) from history.
4. For each gig referenced, generate an API request using the correct API.
5. Always construct the API body using data from history + user request.

6. Return ONLY valid JSON in one of the following formats:

If the request is NOT related to any available API:
{{
  "error": "Request not related to any available API",
  "user_id": "<string or null>",
  "success": false,
  "msg": "Short polite response under 20 words"
}}
If the request IS related to one or multiple APIs:
{{
  "data": [
    {{
      "api_url": "<string>",           // chosen API endpoint
      "api_prompt": "<string>",        // category or API chosen
      "body": {{ ... }},                 // must include gig_id, user_id, and other details
      "success": true
    }},
    {{
      "api_url": "<string>",
      "api_prompt": "<string>",
      "body": {{ ... }},
      "success": true
    }}
  ]
}}

Notes:
- If the user asks to book multiple (e.g., "book 2 and 3"), return multiple objects inside "data".
- If the user says "book all", return one object per gig in history.
- Always choose the most logical API according to the gig category and user intent.
- Ensure JSON is strictly valid, no text outside JSON.
- This is your previous context/history: {history}
"""


llm = get_llm()

collab_p = ChatPromptTemplate.from_messages([
    ("system", collab_prompt),
    ("human", "{msg}")
])

prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{msg}")
])
collab_chain=LLMChain(llm=llm,prompt=collab_p);
chain = LLMChain(llm=llm, prompt=prompt)

class UserRequest(BaseModel):
    msg: str

def process_worker(request: UserRequest,history=None):
    # print(f"Processing request: {request}")
    # print(f"Expected keys: {chain.input_keys}")
    if history is None:
        history = []
    try:
        result = chain.invoke({
            "msg": request.msg,
            "apis": apis,
            "history": history
        })
        # print(f"LLM Raw Result: {result}")

        ai_output = result["text"] if "text" in result else str(result)

        if ai_output.startswith("```"):
            ai_output = ai_output.strip("`").strip()
            if ai_output.lower().startswith("json"):
                ai_output = ai_output[4:].strip()

        import re
        json_match = re.search(r"\{.*\}", ai_output, re.DOTALL)
        if json_match:
            ai_output = json_match.group(0)

    except Exception as e:
        return {"error": f"LLM error: {str(e)}"}

    try:
        api_choice = json.loads(ai_output)

        # ✅ Inject user_id if not included by model
        if "user_id" not in api_choice:
            api_choice["user_id"] = request.user_id

        print(f"Final API Choice: {api_choice}")
        return {"chosen_api": api_choice}

    except Exception as e:
        return {
            "error": f"JSON parse error: {str(e)}",
            "llm_output": ai_output
        }

import json
import re

def process_worker_v2(msg: str, history=None, user_id=None,logged_user_id=None):
    """
    Processes a raw user message (string) + optional history, 
    and decides which API to call.
    """
    if history is None:
        history = []
    print("logged_user_id v2",user_id)
    try:
        # Run chain with inputs
        result = chain.invoke({
            "msg": msg,
            "apis": apis,
            "history": history,
            "logged_user_id":user_id
        })

        # Normalize LLM output
        ai_output = result["text"] if "text" in result else str(result)

        if ai_output.startswith("```"):
            ai_output = ai_output.strip("`").strip()
            if ai_output.lower().startswith("json"):
                ai_output = ai_output[4:].strip()

        # Extract JSON if wrapped
        json_match = re.search(r"\{.*\}", ai_output, re.DOTALL)
        if json_match:
            ai_output = json_match.group(0)

    except Exception as e:
        return {"error": f"LLM error: {str(e)}"}

    try:
        api_choice = json.loads(ai_output)

        # ✅ Ensure user_id is injected
        if user_id and "user_id" not in api_choice:
            api_choice["user_id"] = user_id

        print(f"[process_worker_v2] Final API Choice: {api_choice}")
        return {"chosen_api": api_choice}

    except Exception as e:
        return {
            "error": f"JSON parse error: {str(e)}",
            "llm_output": ai_output
        }

def process_worker_collab(msg: str, history=None, user_id=None):
    """
    Processes a raw user message (string) + optional history, 
    and decides which API to call.
    """
    if history is None:
        history = []

    try:
        # Run chain with inputs
        result = collab_chain.invoke({
            "msg": msg,
            "apis": apis,
            "history": history,
            "logged_user_id":user_id
        })

        # Normalize LLM output
        ai_output = result["text"] if "text" in result else str(result)

        if ai_output.startswith("```"):
            ai_output = ai_output.strip("`").strip()
            if ai_output.lower().startswith("json"):
                ai_output = ai_output[4:].strip()

        # Extract JSON if wrapped
        json_match = re.search(r"\{.*\}", ai_output, re.DOTALL)
        if json_match:
            ai_output = json_match.group(0)

    except Exception as e:
        return {"error": f"LLM error: {str(e)}"}

    try:
        api_choice = json.loads(ai_output)

        # ✅ Ensure user_id is injected
        if user_id and "user_id" not in api_choice:
            api_choice["user_id"] = user_id

        print(f"[process_worker_collab] Final API Choice: {api_choice}")
        return {"chosen_api": api_choice}

    except Exception as e:
        return {
            "error": f"JSON parse error: {str(e)}",
            "llm_output": ai_output
        }
