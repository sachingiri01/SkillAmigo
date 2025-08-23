from pinecone import Pinecone
import os
from dotenv import load_dotenv

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("INDEX_NAME", "skillamigo-index")
USER_INDEX = os.getenv("USER_INDEX", "USER_INDEX")

if not PINECONE_API_KEY:
    raise ValueError("⚠️ Please set the PINECONE_API_KEY environment variable")

# Initialize Pinecone client
pc = Pinecone(api_key=PINECONE_API_KEY)

# Check & create index if it doesn't exist
if not pc.has_index(INDEX_NAME):
    pc.create_index_for_model(
        name=INDEX_NAME,
        cloud="aws",
        region="us-east-1",
        embed={
            "model": "llama-text-embed-v2",
            "field_map": {"text": "chunk_text"}
        }
    )
    print(f"✅ Created Pinecone index '{INDEX_NAME}'")
else:
    print(f"✅ Pinecone index '{INDEX_NAME}' already exists")
if not pc.has_index(USER_INDEX):
    pc.create_index_for_model(
        name=USER_INDEX,
        cloud="aws",
        region="us-east-1",
        embed={
            "model": "llama-text-embed-v2",
            "field_map": {"text": "chunk_text"}
        }
    )
    print(f"✅ Created Pinecone index '{USER_INDEX}'")
else:
    print(f"✅ Pinecone index '{USER_INDEX}' already exists")

# Always connect using the **same exact INDEX_NAME**
users_index = pc.Index(USER_INDEX)
index = pc.Index(INDEX_NAME)
print(f"✅ Pinecone index '{INDEX_NAME}' is ready to use.")
print("Pinecone index stats:", index.describe_index_stats())
