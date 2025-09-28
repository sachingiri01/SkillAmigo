
# from worker import process_worker
from fastapi import FastAPI, Request
from worker import process_worker,process_worker_v2,process_worker_collab
from hit_wroker import hit_chosen_api,hit_chosen_api_collab
async def book_task(combined_msg,history=None):
    try:
        #(f"Combined Message: {combined_msg} , history: {history}")
        resp = process_worker(combined_msg,history)
        #(f"Chain result: {resp}")
        if resp.get('success') == False:
            return resp.get('error', 'No error message provided')
        response=await hit_chosen_api(resp);
        return response

    except Exception as e:
        #(f"Error processing task: {e}")
        return {"error": str(e)}


async def book_task_super(combined_msg,history=None,logged_user_id=None):
    try:
        # #(f"Combined Message: {combined_msg} , history: {history}")
        #("logged_used_id",logged_user_id)
        resp = process_worker_v2(combined_msg,history,logged_user_id)
        #(f"Chain result: {resp}")
        if resp.get('success') == False:
            return resp.get('error', 'No error message provided')
        response=await hit_chosen_api(resp);
        return response

    except Exception as e:
        #(f"Error processing task: {e}")
        return {"error": str(e)}

async def book_task_collab(combined_msg,history=None,user_id=None):
    try:
        #(f"Combined Message: {combined_msg} , history: {history}")
        resp = process_worker_collab(combined_msg,history,user_id)
        # #(f"Chain result: {resp}")
        if resp.get('success') == False:
            return resp.get('error', 'No error message provided')
        response=await hit_chosen_api_collab(resp);
        return response

    except Exception as e:
        #(f"Error processing task: {e}")
        return {"error": str(e)}
