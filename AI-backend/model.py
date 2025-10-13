# from langchain_google_genai import GoogleGenerativeAIEmbeddings
# from langchain_google_genai import ChatGoogleGenerativeAI
# from langchain.prompts import ChatPromptTemplate
# from langchain.chains import LLMChain
# from dotenv import load_dotenv
# from langchain_huggingface import HuggingFaceEndpoint
# from langchain_community.llms import HuggingFaceHub
# import os
# from langchain_huggingface import ChatHuggingFace
# load_dotenv()



# mistral_llm = HuggingFaceEndpoint(
#     repo_id="mistralai/Mistral-7B-Instruct-v0.2",
#     temperature=0,
#     max_new_tokens=512,
#     huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY") 
# )


# olama = HuggingFaceEndpoint(
#     repo_id="meta-llama/Llama-3.1-8B-Instruct",
#     temperature=0,
#     max_new_tokens=512,
#     huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY") 
# )

# olama_llm = ChatHuggingFace(llm=olama)
# # Wrap it as a chat model
# mistral = ChatHuggingFace(llm=mistral_llm)

# os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
# gemini = ChatGoogleGenerativeAI(
#     model="gemini-2.5-flash",
#     temperature=0
# )

# prompt = ChatPromptTemplate.from_messages([
#     ("system", 
#      "You are SkillAmigo's AI Agent. "
#      "You can book chats, arrange bargains on the user’s behalf, and assist them extensively. "
#      "You are an official AI representative of SkillAmigo, a platform for exchanging services. "
#      "Always be polite, efficient, and proactive. U can ask question if u like to know more about the user or query or anything"),
#     ("human", "{user_input}")
# ])
# chain = LLMChain(llm=gemini, prompt=prompt)

# def llm_chain(prompt):
#     return chain.run({"user_input":prompt})

# def get_llm():
#     return gemini;

from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace
import os

load_dotenv()

# -------------------
# LLM Setup
# -------------------
mistral_llm = HuggingFaceEndpoint(
    repo_id="mistralai/Mistral-7B-Instruct-v0.2",
    temperature=0,
    max_new_tokens=512,
    huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY")
)

olama = HuggingFaceEndpoint(
    repo_id="meta-llama/Llama-3.1-8B-Instruct",
    temperature=0,
    max_new_tokens=512,
    huggingfacehub_api_token=os.getenv("HUGGIN_FACE_API_KEY")
)

# Wrap as chat models
mistral = ChatHuggingFace(llm=mistral_llm)
olama_llm = ChatHuggingFace(llm=olama)

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")

gemini = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0
)

# -------------------
# Prompt Template
# -------------------
prompt = ChatPromptTemplate.from_messages([
    ("system", 
     "You are SkillAmigo's AI Agent. "
     "You can book chats, arrange bargains on the user’s behalf, and assist them extensively. "
     "You are an official AI representative of SkillAmigo, a platform for exchanging services. "
     "Always be polite, efficient, and proactive. "
     "You can ask questions if you want to know more about the user or query."),
    ("human", "{user_input}")
])

# -------------------
# New LangChain v2 Pipeline
# -------------------
# Instead of LLMChain(llm=gemini, prompt=prompt)
chain = prompt | gemini

def llm_chain(user_input):
    response = chain.invoke({"user_input": user_input})
    return response.content  # response is a ChatMessage

def get_llm():
    return gemini
