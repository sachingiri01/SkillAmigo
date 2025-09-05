from fastapi import FastAPI
from agent import process_request
from fastapi.responses import JSONResponse
from worker import process_worker
from search_work import searching
from pydantic import BaseModel
from fastapi import FastAPI, Request
from chat_worker import chat_work
from book_worker import book_task
from supervisor import surpervisor_work
from pine import index
from upload import upload_data_to_pinecone,upload_data_to_pinecone_gig,upload_data_to_pinecone_user,upload_text_to_pinecone,update_policy_to_pinecone
from organizer import expand_query
import requests
from rag_upload import rag_upload
import json
from fastapi.middleware.cors import CORSMiddleware
# from routers.users import router as users_router
# from routers.items import router as items_router

app = FastAPI()

# Allow Next.js frontend (localhost:3000) to call FastAPI
origins = [
    "http://localhost:3000",   # Next.js dev server
    "http://127.0.0.1:3000"    # sometimes Next.js uses 127.0.0.1
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # which frontend URLs can talk to backend
    allow_credentials=True,
    allow_methods=["*"],          # allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],          # allow all headers
)
# app.include_router(users_router)
# app.include_router(items_router)
class UserRequest(BaseModel):
    msg: str

class surpervisormodel(BaseModel):
    msg: str
    history: list


@app.get("/")
def read_root():
    # res=process_request("Api working")
    # return {f"message": "Hello, FastAPI! {res}"}
    return {"msg": "api working well"}


# this api return the respone for the query selecting which api to hit with body
@app.post("/process")
def process_request(request:UserRequest):
   print(f"Received request: {request.msg}")
   res= process_worker(request)
   return {"data":res, "msg": "process worker response"}

#  it check first need search or not if dont need search return msg else search in the db and return the data from pinecone
@app.post("/search_worker")
def search_worker(request: UserRequest):
    print(f"Received request: {request.msg}")
    res = searching(request.msg)
    return {"data": res, "msg": "search worker response"}

#this worker book the gig for users how-> it first make promtpt string -> then search best api for the task if there it hit the api with the body maked else return the msg
@app.post("/book_worker")
async def booking_worker(request: Request):
    task_data = await request.json()
    # print(f"Received request in book : {task_data}")
    # convert to SimpleNamespace for process_worker
    from types import SimpleNamespace
    request_obj = SimpleNamespace(msg=" | ".join(f"{k}: {v}" for k, v in task_data.items()))
    res =await book_task(request_obj)
    return {"data": res, "msg": "book worker response"}

@app.post("/chat-worker")
async def chatting_worker(request: Request):
    print("getting hit")

    chat_data = await request.json()
    print(chat_data['msg'])



    # print(f"Received request in book : {task_data}")
    # convert to SimpleNamespace for process_worker

    # Extract values
    msg = chat_data["msg"]
    history = chat_data["history"]

    print("📝 Prompt:", msg)
    print("📜 History:", history)


    res =chat_work(msg,history)
    return {
        "msg":"chat worker response",
        "data": res
        }

# to automate the task built to automate the thinking task to direct the which worker to work
# @app.post("/supervisor")
# async def surpervisor(request: Request):

#     task_data = await request.json()
#     msg = task_data.get('msg')
#     final_msg=task_data['msg']
#     history = task_data.get('history', [])
#     full_chat = ""

#     if history:
#         for msg in history:
#             role = msg.get("type")
#             content = msg.get("content")
#             if role == "user":
#                 full_chat += f"User: {content}\n"
#             elif role == "agent":
#                 full_chat += f"Assistant: {content}\n"
#         full_chat = full_chat.strip()  
#     print(f"Received request in surpervisor : {history} , formatted chat:\n{full_chat}")
    
#     print("sending ",full_chat,final_msg)
#     res = await surpervisor_work(full_chat, final_msg)

#     return {"data": res, "msg": "surpervisor response"}


@app.post("/supervisor")
async def surpervisor(request: Request):
    task_data = await request.json()
    msg = task_data.get("msg")
    final_msg = task_data.get("msg")
    history = task_data.get("history", [])
    full_chat = ""
    collected_data = []  # <-- to store gig arrays
    logged_user_id = history[0].get("logged_user_id") if history else None
    print(logged_user_id," yes")
    if history:
        for msg in history:
            role = msg.get("type")
            content = msg.get("content")
            data = msg.get("data")  # <-- capture array if present

            if role == "user":
                full_chat += f"User: {content}\n"
            elif role == "agent":
                full_chat += f"Assistant: {content}\n"

            if data:  # if there's a gig array, save it
                collected_data.extend(data)

        full_chat = full_chat.strip()

    print(f"Received request in supervisor : {history} , formatted chat:\n{full_chat}")
    print("Collected gigs:", collected_data)   # ✅ you'll see your gigs array here

    res = await surpervisor_work(full_chat, final_msg,collected_data,logged_user_id)
    print("final sending basck",res);
    return {
        "data": res,
        "msg": "supervisor response"
    }

@app.get("/pinecone-status")
def pinecone_status():
    stats = index.describe_index_stats()
    return stats.to_dict() 


@app.post("/upload-data")
def upload_data():
    print("Uploading data to Pinecone...")
    result = upload_data_to_pinecone()
    return result

@app.post("/organizer")
async def organise(request:Request):
    task_data = await request.json()
    print("organizer working");
    history = task_data.get("history", [])
    logged_user_id = history[0].get("logged_user_id") if history else None
    result=await expand_query(task_data['msg'],task_data['history'],logged_user_id);
    print("result collab ",result)
    return result;
    

@app.post("/upload-gig")
async def upload_data(request: Request):
    """
    Endpoint to receive gig JSON and upload to Pinecone.
    """
    try:
        gig = await request.json()   
        print("Received gig:", gig)

        result = upload_data_to_pinecone_gig(gig) 
        print("response upload",result)
        return result

    except Exception as e:
        return {"status": "error", "msg": str(e)}

@app.post("/upload-user")
async def upload_data(request: Request):
    """
    Endpoint to receive gig JSON and upload to Pinecone.
    """
    try:
        user = await request.json()  
        print("Received user:", user)

        result = upload_data_to_pinecone_user(user)  
        print("response upload",result)
        return result

    except Exception as e:
        return {"status": "error", "msg": str(e)}
    

@app.post("/update-policy")
async def upload_data(request: Request):
    """
    Endpoint to receive gig JSON and upload to Pinecone.
    """
    try:
        data = await request.json()
        msg=data.get('msg');
        doc_id=data.get('doc_id') or "User_manual"
        source=data.get('source') or "manual"
        doc_type=data.get('doc_type') or "general"  
        print("Received user:", data.get('msg'))
        if(len(msg)==0):
            return {"status": "success", "msg": f"Nothing to upload"}
        result = update_policy_to_pinecone(
              raw_text=msg,
              doc_id=doc_id,
              doc_type=doc_type,
              source=source,
        )  
        print("response update",result)
        return result

    except Exception as e:
        return {"status": "error", "msg": str(e)}
    


@app.get("/rag-upload123098")
async def upload_data(request: Request):
    """
   
    """
    try:
        response=rag_upload();
        return response

    except Exception as e:
        return {"status": "error", "msg": str(e)}
    
