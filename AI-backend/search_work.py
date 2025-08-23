from agent import got_only_search,get_data,got_only_search_user
from model import llm_chain, get_llm

def searching(api_prompt):

    # Extract data from the API prompt
    extracted = get_data(api_prompt)
    print(f"Extracted data: {extracted}")
    # If it needs search, perform the search
    if extracted['needs_search']=="false":
        return extracted;
    print(f"Performing search for query: {extracted['query']}")
    if(extracted['valid']=="true"):
        print("searching on gigs")
        response=got_only_search(extracted['query'])
    else:
        print("searching on users")
        response=got_only_search_user(extracted['query'])
    if response.get("success") == False:
        return {
            "error": "Failed to perform search",
            "details": response.get("error", "Unknown error"),
            "msg": f"Some error occured while searching for you, please try again later",
            "success": False
        }
    return {
        "extracted": extracted,
        "data": response.get("pinecone_results", []),
        "success": True
    }