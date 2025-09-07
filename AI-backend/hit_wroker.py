import requests
from dotenv import load_dotenv
import os
load_dotenv()
BACKEND_API_KEY = os.getenv("BACKEND_URL")
async def hit_chosen_api(chain_result):
    api = chain_result['chosen_api']
    url = api['api_url']
    body = api.get('body', {})  
    user_id = api.get('user_id')

    print(f"Making request to {url} with body: {body} and user_id: {user_id}")
    if user_id:
        body['user_id'] = user_id


    response =requests.post(url, json=body)
    print("api reuslt ",response.json())
    try:
        return response.json()
    except Exception:
        return response.text


def hit_collaborator():
    url = f"{BACKEND_API_KEY}/get-cat-list"
    print("back ", url)
    try:
        response = requests.get(url)
        return response.json()
    except Exception as e:
        return {"error": str(e)}
import requests
import json

# async def hit_chosen_api_collab(chain_result):
#     results = []

#     try:
#         api_calls = chain_result.get("chosen_api", {}).get("data", [])
#         if not api_calls:
#             return {
#                 "success": False,
#                 "msg": "No API calls provided.",
#                 "responses": []
#             }

#         for api in api_calls:
#             url = api.get("api_url")
#             body = api.get("body", {}).copy()  # safe copy
#             user_id = api.get("user_id")

#             if user_id:
#                 body["user_id"] = user_id

#             print(f"Making request to {url} with body: {body}")

#             try:
#                 response = requests.post(url, json=body, timeout=10)
#                 try:
#                     resp_json = response.json()
#                 except Exception:
#                     resp_json = {"raw": response.text}

#                 results.append({
#                     "status_code": response.status_code,
#                     "response": resp_json
#                 })

#             except Exception as e:
#                 results.append({
#                     "error": str(e)
#                 })

#         return {
#             "success": True,
#             "msg": f"Executed {len(results)} API call(s). Booking Successfull :)",
#             "responses": results
#         }

#     except Exception as e:
#         return {
#             "success": False,
#             "msg": f"❌ Error in hit_chosen_api_collab: {e}",
#             "responses": []
#         }
async def hit_chosen_api_collab(chain_result):
    results = []

    try:
        api_calls = chain_result.get("chosen_api", {}).get("data", [])
        if not api_calls:
            return {
                "success": False,
                "msg": "No API calls provided.",
                "responses": []
            }

        for api in api_calls:
            url = api.get("api_url")
            body = api.get("body", {}).copy()
            user_id = api.get("user_id")

            if user_id:
                body["user_id"] = user_id

            print(f"Making request to {url} with body: {body}")

            try:
                response = requests.post(url, json=body, timeout=10)
                try:
                    resp_json = response.json()
                except Exception:
                    resp_json = {"raw": response.text}

                # ✅ if API sends back a custom message, return immediately
                if isinstance(resp_json, dict) and "msg" in resp_json:
                    return {
                        "success": response.status_code == 200,
                        "msg": resp_json.get("msg"),
                        "responses": [resp_json]
                    }

                results.append({
                    "status_code": response.status_code,
                    "response": resp_json
                })

            except Exception as e:
                return {  # immediate fail if API request fails
                    "success": False,
                    "msg": f"❌ API error: {e}",
                    "responses": []
                }
        resp_msg = results[0]['response'].get('message') or results[0]['response'].get('error', 'Error Occured')
        return {
            "success": True,
            "msg": f"Executed {len(results)} API call(s). {resp_msg} :)",
            "responses": results
        }

    except Exception as e:
        return {
            "success": False,
            "msg": f"❌ Error in hit_chosen_api_collab: {e}",
            "responses": []
        }
