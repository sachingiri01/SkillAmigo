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
from upload import upload_data_to_pinecone
from organizer import expand_query
import requests
import json
# from routers.users import router as users_router
# from routers.items import router as items_router

app = FastAPI()

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
async def booking_worker(request: Request):
    print("getting hit")
    chat_data = await request.json()
    print(chat_data['msg'])
    # print(f"Received request in book : {task_data}")
    # convert to SimpleNamespace for process_worker
    res =chat_work(chat_data)
    return {
        "msg":"chat worker response",
        "data": res
        }

# to automate the task built to automate the thinking task to direct the which worker to work
@app.post("/surpervisor")
async def surpervisor(request: Request):
    task_data = await request.json()
    print(f"Received request in surpervisor -0: {task_data}")
    from types import SimpleNamespace
    request_obj = SimpleNamespace(msg=" | ".join(f"{k}: {v}" for k, v in task_data.items()))
    print(f"Received request in surpervisor : {task_data['history']} , {request_obj}")
    res =await surpervisor_work(task_data['history'], request_obj)
    return {"data": res, "msg": "surpervisor response"}


# to test the pincone connection


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
    result=await expand_query(task_data['msg'],task_data['history']);
    return result;
    

