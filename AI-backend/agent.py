import os
from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
from langchain_community.vectorstores import Pinecone
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from model import llm_chain,get_llm
from pine import index,users_index


load_dotenv()

os.environ["GOOGLE_API_KEY"] = os.getenv("GOOGLE_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")
INDEX_NAME = os.getenv("INDEX_NAME")     # Change to your Pinecone index


prompt = ChatPromptTemplate.from_messages([
    ("system", 
     "You are SkillAmigo's AI Agent. "
     "You can book chats, arrange bargains on the user’s behalf, and assist them extensively. "
     "You are an official AI representative of SkillAmigo, a platform for exchanging services. "
     "Always be polite, efficient, and proactive."),
    ("human", "{user_input}")
])
llm=get_llm();
chain = LLMChain(llm=llm, prompt=prompt)

schemas_extract = [
    ResponseSchema(
        name="id",
        description="User ID as a string. If no user ID is present, return null."
    ),
    ResponseSchema(
        name="query",
        description=(
            "A refined version of the user query. Rephrase or enrich it with relevant keywords "
            "to make it easier for the next agent to understand. "
            "For example: if the user query is about cars, include related terms like 'vehicle'."
        )
    ),
    ResponseSchema(
        name="valid",
        description=(
            "Boolean flag for which index to use in Pinecone. it can only be 'true' or 'false. "
            "True → the query requires searching on the gigs , post related things. "
            "False → the query is related to users and should be resolved against the user index."
        )
    ),
    ResponseSchema(
    name="needs_search",
    description=(
        "Boolean. True if the query requires searching in Pinecone (either gigs_index or users_index). "
        "False only if the answer can be given directly without Pinecone (like greetings, small talk)."
    )
    ),

    ResponseSchema(
        name="msg",
        description=(
    "You are SkillAmigo's official AI SkillMatcher. "
    "SkillAmigo is a platform for exchanging services, booking gigs, negotiating prices, and interacting with service providers.\n\n"

    "Capabilities:\n"
    "- You can remember the context of previous messages within the current conversation.\n"
    "- You use chat history to clarify follow-up questions, continue tasks, or maintain user preferences during the session.\n"
    "- You assist users in finding gigs, service providers, booking or cancelling gigs, negotiating prices, and viewing profiles.\n\n"

    "A natural, user-facing message must always sound genuine, context-aware, and helpful.\n\n"
    "Examples:\n"
    "- If the user asked: 'show me gigs for renovation' → "
    "'Sure! Here are the renovation gigs I found for you. Check them out and let me know if you'd like more help.'\n"
    "- If the query is about a user: 'find users with name Verma' → "
    "'Sure! Here are the most relevant users named Verma from our platform.'\n"
    "- If the user says: 'book the first gig for tomorrow' → "
    "'Got it ✅ I’ll book the first available gig for tomorrow based on our chat.'\n"
    "- If the user says: 'cancel my last booking' → "
    "'Understood. Please share the reason, and I’ll cancel your booking right away.'\n"
    "- If the user says: 'can you lower the price for this gig?' → "
    "'I can help you negotiate! Let’s suggest a fair price to the provider and see if they accept.'\n"
    "- If the user asks: 'show me gigs under 500 in Bangalore' → "
    "'Here are the gigs in Bangalore that fit under ₹500. Want me to filter them by category as well?'\n"
    "- If the user follows up with: 'book the second one' → "
    "'Perfect, booking the second gig from our list for you. ✅'\n"
    "- If the user asks about a profile: 'show me details of user 12345' → "
    "'Here’s the profile info for that user. Let me know if you’d like to connect or book their gig.'\n"
    "- If the user is just chatting casually (e.g., 'hey, how are you?' or 'what’s up?') → "
    "'Hey there! 😊 I’m SkillAmigo’s AI SkillMatcher. I can search users for you, help book gigs, cancel bookings, negotiate prices, or show profiles — just let me know what you need.'"
)


    ),
]

parser_extract = StructuredOutputParser.from_response_schemas(schemas_extract)
format_extract = parser_extract.get_format_instructions()

prompt_extract = ChatPromptTemplate.from_template("""
Extract the following fields from the prompt: id, query. if there and make the query formated if needed accordingly
 You are a decision maker.
Given the user's query, decide if you need to fetch extra knowledge from Pinecone vector DB.
Return true if it needs external search (e.g., factual, recent events, deep knowledge).
Return false if the model can answer without external data for the need_search parameter.
{format_instructions}

Prompt:
{user_input}
""")

extract_chain = LLMChain(llm=llm, prompt=prompt_extract)

# ===== Step 2: Decide if Pinecone Search is Needed =====
schemas_decide = [
    ResponseSchema(name="needs_search", description="true if query needs external knowledge, else false")
]
parser_decide = StructuredOutputParser.from_response_schemas(schemas_decide)
format_decide = parser_decide.get_format_instructions()

prompt_decide = ChatPromptTemplate.from_template("""
You are a decision maker.
Given the user's query, decide if you need to fetch extra knowledge from Pinecone vector DB.
Return true if it needs external search (e.g., factual, recent events, deep knowledge).
Return false if the model can answer without external data for the need_search parameter.

{format_instructions}

Query:
{query}
""")

decide_chain = LLMChain(llm=llm, prompt=prompt_decide)

# ===== Pinecone Init =====
# pinecone = Pinecone(api_key=PINECONE_API_KEY)
# index = pinecone.Index(INDEX_NAME)
# ===== Orchestration Function =====
def get_data(api_prompt):
    print("api promtpt in get deata ",api_prompt)
    extracted_raw = extract_chain.run(user_input=api_prompt, format_instructions=format_extract)
    extracted = parser_extract.parse(extracted_raw)
    return extracted

def process_request(api_prompt):
    # Step 1: Extract fields
    extracted_raw = extract_chain.run(user_input=api_prompt, format_instructions=format_extract)
    extracted = parser_extract.parse(extracted_raw)

    # Step 2: Decide on Pinecone usage
    # decide_raw = decide_chain.run(query=extracted['query'], format_instructions=format_decide)
    # decision = parser_decide.parse(decide_raw)
    needs_search = extracted['needs_search']

    # return (f"getting your response from there , {extracted_raw} -> {needs_search}")

    # Step 3: Fetch or Answer
    if needs_search:
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        vectorstore = Pinecone.from_existing_index(INDEX_NAME, embeddings)
        search_results = vectorstore.similarity_search(extracted['query'], k=3)
        return {
            "id": extracted['id'],
            "query": extracted['query'],
            "needs_search": True,
            "pinecone_results": [doc.page_content for doc in search_results]
        }
    else:
        return {
            "id": extracted['id'],
            "name": extracted['name'],
            "email": extracted['email'],
            "query": extracted['query'],
            "needs_search": False,
            "response": llm_chain(extracted['query'])
        }

# def got_only_search(api_prompt, top_k=5, namespace="__default__"):
#     results = index.search(
#         namespace=namespace,
#         query={"inputs": {"text": api_prompt}, "top_k": top_k},
#         fields=["chunk_text", "type", "title", "category", "price", "rating"]
#     )

#     processed = []
#     if results and "result" in results and "hits" in results["result"]:
#         for hit in results["result"]["hits"]:
#             processed.append({
#                 "id": hit.get("_id"),
#                 "score": hit.get("_score"),
#                 "metadata": hit.get("fields", {}),
#                 "chunk_text": hit.get("fields", {}).get("chunk_text")
#             })

#     return {
#         "api_prompt": api_prompt,
#         "pinecone_results": processed,
#         "success": True
#     }



# def got_only_search_user(api_prompt, top_k=5, namespace="__default__"):

#     results = users_index.search(
#         namespace=namespace,
#         query={"inputs": {"text": api_prompt}, "top_k": top_k},
#         fields=["chunk_text","name", "skills", "gig", "experience", "location"]
#     )

#     processed = []
#     if results and "result" in results and "hits" in results["result"]:
#         for hit in results["result"]["hits"]:
#             processed.append({
#                 "id": hit.get("_id"),
#                 "score": hit.get("_score"),
#                 "metadata": hit.get("fields", {}),
#                 "chunk_text": hit.get("fields", {}).get("chunk_text")
#             })

#     return {
#         "api_prompt": api_prompt,
#         "pinecone_results": processed,
#         "success": True
#     }
def got_only_search_user(api_prompt, top_k=5, namespace="__default__"):
    results = users_index.search(
        namespace=namespace,
        query={"inputs": {"text": api_prompt}, "top_k": top_k},
        fields=[
            "chunk_text",
            "name",
            "email",
            "phone",
            "profile_picture",
            "bio",
            "merit_credits",
            "is_verified",
            "role",
            "created_at",
            "updated_at"
        ]
    )

    processed = []
    if results and "result" in results and "hits" in results["result"]:
        for hit in results["result"]["hits"]:
            fields = hit.get("fields", {})
            processed.append({
                "id": hit.get("_id"),
                "score": hit.get("_score"),
                "metadata": {
                    "name": fields.get("name"),
                    "email": fields.get("email"),
                    "phone": fields.get("phone"),
                    "profile_picture": fields.get("profile_picture"),
                    "bio": fields.get("bio"),
                    "merit_credits": fields.get("merit_credits"),
                    "is_verified": fields.get("is_verified"),
                    "role": fields.get("role"),
                    "created_at": fields.get("created_at"),
                    "updated_at": fields.get("updated_at")
                },
                "chunk_text": fields.get("chunk_text")
            })

    return {
        "api_prompt": api_prompt,
        "pinecone_results": processed,
        "success": True
    }

def got_only_search(api_prompt, top_k=5, namespace="__default__"):
    results = index.search(
        namespace=namespace,
        query={"inputs": {"text": api_prompt}, "top_k": top_k},
        fields=[
            "chunk_text",
            "type",
            "title",
            "description",
            "category",
            "min_price",
            "avg_price",
            "rating",
            "location",
            "picture",
            "contact_email",
            "contact_phone",
            "user_name",
            "user_profile_picture",
            "user_role",
            "user_is_verified"
        ]
    )

    processed = []
    if results and "result" in results and "hits" in results["result"]:
        for hit in results["result"]["hits"]:
            fields = hit.get("fields", {})

            processed.append({
                "id": hit.get("_id"),
                "score": hit.get("_score"),
                "title": fields.get("title", ""),
                "description": fields.get("description", ""),
                "category": fields.get("category", ""),
                "min_price": float(fields.get("min_price") or 0),
                "avg_price": float(fields.get("avg_price") or 0),
                "rating": float(fields.get("rating") or 0),
                "location": fields.get("location", ""),
                "picture": fields.get("picture", ""),
                "chunk_text": fields.get("chunk_text", ""),
                "type": fields.get("type", ""),

                # Rebuild nested contact_info
                "contact_info": {
                    "email": fields.get("contact_email", ""),
                    "phone": fields.get("contact_phone", "")
                },

                # Rebuild nested user
                "user": {
                    "name": fields.get("user_name", ""),
                    "profile_picture": fields.get("user_profile_picture", ""),
                    "role": fields.get("user_role", ""),
                    "is_verified": bool(fields.get("user_is_verified", False))
                }
            })

    return {
        "api_prompt": api_prompt,
        "pinecone_results": processed,
        "success": bool(processed)
    }


# async def got_only_search_collab(api_prompt, top_k=1, namespace="__default__"):
#     results = index.search(
#         namespace=namespace,
#         query={"inputs": {"text": api_prompt}, "top_k": top_k},
#         fields=["chunk_text", "type", "title", "category", "price", "rating"]
#     )

#     processed = []
#     if results and "result" in results and "hits" in results["result"]:
#         for hit in results["result"]["hits"]:
#             processed.append({
#                 "id": hit.get("_id"),
#                 "score": hit.get("_score"),
#                 "metadata": hit.get("fields", {}),
#                 "chunk_text": hit.get("fields", {}).get("chunk_text")
#             })

#     return {
#         "api_prompt": api_prompt,
#         "pinecone_results": processed,
#         "success": True
#     }


async def got_only_search_collab(api_prompt, top_k=1, namespace="__default__"):
    results = index.search(
        namespace=namespace,
        query={"inputs": {"text": api_prompt}, "top_k": top_k},
        fields=[
            "chunk_text",
            "type",
            "title",
            "description",
            "category",
            "min_price",
            "avg_price",
            "rating",
            "location",
            "picture",
            "contact_email",
            "contact_phone",
            "user_name",
            "user_profile_picture",
            "user_role",
            "user_is_verified"
        ]
    )

    processed = []
    if results and "result" in results and "hits" in results["result"]:
        for hit in results["result"]["hits"]:
            fields = hit.get("fields", {})

            processed.append({
                "id": hit.get("_id"),
                "score": hit.get("_score"),
                "title": fields.get("title", ""),
                "description": fields.get("description", ""),
                "category": fields.get("category", ""),
                "min_price": float(fields.get("min_price") or 0),
                "avg_price": float(fields.get("avg_price") or 0),
                "rating": float(fields.get("rating") or 0),
                "location": fields.get("location", ""),
                "picture": fields.get("picture", ""),
                "chunk_text": fields.get("chunk_text", ""),
                "type": fields.get("type", ""),

                # Rebuild nested contact_info
                "contact_info": {
                    "email": fields.get("contact_email", ""),
                    "phone": fields.get("contact_phone", "")
                },

                # Rebuild nested user
                "user": {
                    "name": fields.get("user_name", ""),
                    "profile_picture": fields.get("user_profile_picture", ""),
                    "role": fields.get("user_role", ""),
                    "is_verified": bool(fields.get("user_is_verified", False))
                }
            })

    return {
        "api_prompt": api_prompt,
        "pinecone_results": processed,
        "success": bool(processed)
    }
