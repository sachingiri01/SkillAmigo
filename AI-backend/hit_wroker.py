import requests
async def hit_chosen_api(chain_result):
    api = chain_result['chosen_api']
    url = api['api_url']
    body = api.get('body', {})  
    user_id = api.get('user_id')

    print(f"Making request to {url} with body: {body} and user_id: {user_id}")
    if user_id:
        body['user_id'] = user_id


    response =requests.post(url, json=body)

    try:
        return response.json()
    except Exception:
        return response.text


async def hit_collaborator():
    url="localhost:3000/api/get-categories"
    response =requests.get(url);

    try:
        return response.json()
    except Exception:
        return response.text

import requests
import json

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
            body = api.get("body", {}).copy()  # safe copy
            user_id = api.get("user_id")

            if user_id:
                body["user_id"] = user_id

            print(f"Making request to {url} with body: {body}")

            try:
                response = requests.post(url, json=body, timeout=10)
                response =await requests.post(url, json=body, timeout=10)
                try:
                    resp_json = response.json()
                except Exception:
                    resp_json = {"raw": response.text}

                results.append({
                    "status_code": response.status_code,
                    "response": resp_json
                })

            except Exception as e:
                results.append({
                    "error": str(e)
                })

        return {
            "success": True,
            "msg": f"Executed {len(results)} API call(s).",
            "responses": results
        }

    except Exception as e:
        return {
            "success": False,
            "msg": f"❌ Error in hit_chosen_api_collab: {e}",
            "responses": []
        }
