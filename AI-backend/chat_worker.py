# from langchain.prompts import ChatPromptTemplate
# from langchain.chains import LLMChain
# from model import get_llm

# llm = get_llm()


# system_prompt = """
# You are SkillAmigo's official AI assistant.
# SkillAmigo is a platform for exchanging services, booking gigs, negotiating prices, and interacting with service providers.

# Available APIs:
# - search_user: Search users by name, skill, or location. Body: {{"query": "string", "filters": "object"}}
# - book_gig: Book a gig for a user. Body: {{"gig_id": "string", "user_id": "string", "date": "string"}}
# - get_user_profile: Fetch user profile info. Body: {{"user_id": "string"}}
# - list_gigs: List available gigs. Body: {{"category": "string", "location": "string", "price_range": "string"}}
# - cancel_booking: Cancel a booked gig. Body: {{"booking_id": "string", "user_id": "string", "reason": "string"}}

# Behavior:
# 1. Always be polite, helpful, and concise.
# 2. Suggest the correct API if the user wants to do something actionable.
# 3. If the request is completely outside the platform’s scope, respond with: "Please contact admin for further assistance."
# """


# chat_prompt = ChatPromptTemplate.from_messages([
#     ("system", system_prompt),
#     ("human", "{chat}")
# ])



# chat_chain = LLMChain(llm=llm, prompt=chat_prompt)

# def chat_work(chat_str: str,history=None):
#     response = chat_chain.invoke({"chat": chat_str})
#     return response



from langchain.prompts import ChatPromptTemplate
from langchain.chains import LLMChain
from model import get_llm  # You must implement or import your own LLM from model.py


# 1. Define the enhanced system prompt
system_prompt = """
You are SkillAmigo's official AI assistant.
SkillAmigo is a platform for exchanging services, booking gigs, negotiating prices, and interacting with service providers.

Capabilities:
- You can remember the context of previous messages within the current conversation.
- You use chat history to help clarify follow-up questions, continue tasks, or maintain user preferences during the session.
- You assist users in finding gigs, service providers, booking or cancelling gigs, and viewing profiles.

Available APIs:
- search_user: Search users by name, skill, or location. Body: {{"query": "string", "filters": "object"}}
- book_gig: Book a gig for a user. Body: {{"gig_id": "string", "user_id": "string", "date": "string"}}
- get_user_profile: Fetch user profile info. Body: {{"user_id": "string"}}
- list_gigs: List available gigs. Body: {{"category": "string", "location": "string", "price_range": "string"}}
- cancel_booking: Cancel a booked gig. Body: {{"booking_id": "string", "user_id": "string", "reason": "string"}}

Behavior Guidelines:
1. Always be polite, helpful, and concise.
2. Use context from previous messages to inform your responses.
3. Suggest the correct API if the user wants to do something actionable.
4. Ask clarifying questions if user input is incomplete or ambiguous.
5. If the request is completely outside the platform’s scope, respond with: "Please contact admin for further assistance."
6. Reply in short simple not too big msg try always to be as much on the point as possible
"""


# 2. Setup LangChain prompt
chat_prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{chat}")
])


# 3. Setup LLM Chain
llm = get_llm()
chat_chain = LLMChain(llm=llm, prompt=chat_prompt)

def chat_work(chat_str: str, history: dict = None, agent_key: str = "knowledge-mentor"):
    
    if history and agent_key in history:
        message_list = history
        full_chat = ""
        for msg in message_list:
            role = msg.get("type")
            content = msg.get("content")
            if role == "user":
                full_chat += f"User: {content}\n"
            elif role == "agent":
                full_chat += f"Assistant: {content}\n"
    else:
        full_chat = ""

    # Append current user input
    full_chat += f"User Asking now : {chat_str}"
    # Get response from chain
    response = chat_chain.invoke({"chat": full_chat})
    return response


# 5. Helper to update history
def update_history(history: list[str], user_input: str, assistant_response: str) -> list[str]:
    """
    Updates the chat history with the latest exchange.

    Args:
        history (list[str]): Existing chat history.
        user_input (str): User's message.
        assistant_response (str): Assistant's reply.

    Returns:
        list[str]: Updated history list.
    """
    if history is None:
        history = []
    history.append(user_input)
    history.append(assistant_response)
    return history

