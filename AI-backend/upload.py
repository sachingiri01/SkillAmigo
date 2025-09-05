from pine import users_index,index,retriever,r1
import uuid

gigs =[
  {
    "gig_id": "1",
    "title": "Modern Logo Design",
    "description": "I will create a sleek and professional logo tailored to your brand.",
    "category": "Design",
    "min_price": 50.00,
    "avg_price": 120.00,
    "location": "Remote",
    "rating": 4.8,
    "picture": "https://picsum.photos/600/400?1",
    "contact_info": { "email": "alex@designhub.com", "phone": "+91-9876543210" },
    "user": {
      "name": "Alex Johnson",
      "profile_picture": "https://randomuser.me/api/portraits/men/45.jpg",
      "role": "designer",
      "is_verified": "true"
    }
  },
  {
    "gig_id": "2",
    "title": "Full Stack Web Development",
    "description": "Build scalable MERN stack web apps with authentication and payments.",
    "category": "Development",
    "min_price": 200.00,
    "avg_price": 400.00,
    "location": "Bangalore, India",
    "rating": 4.9,
    "picture": "https://picsum.photos/600/400?2",
    "contact_info": { "email": "rahul@devpro.com", "phone": "+91-9988776655" },
    "user": {
      "name": "Rahul Mehta",
      "profile_picture": "https://randomuser.me/api/portraits/men/20.jpg",
      "role": "developer",
      "is_verified": "true"
    }
  },
  {
    "gig_id": "3",
    "title": "Social Media Marketing",
    "description": "Grow your business with data-driven social media strategies.",
    "category": "Marketing",
    "min_price": 80.00,
    "avg_price": 150.00,
    "location": "Mumbai, India",
    "rating": 4.6,
    "picture": "https://picsum.photos/600/400?3",
    "contact_info": { "email": "sara@socialbuzz.com" },
    "user": {
      "name": "Sara Khan",
      "profile_picture": "https://randomuser.me/api/portraits/women/32.jpg",
      "role": "marketer",
      "is_verified": "true"
    }
  },
  {
    "gig_id": "4",
    "title": "Mobile App Development",
    "description": "Cross-platform mobile apps with React Native & Flutter.",
    "category": "Development",
    "min_price": 300.00,
    "avg_price": 600.00,
    "location": "Hyderabad, India",
    "rating": 4.7,
    "picture": "https://picsum.photos/600/400?4",
    "contact_info": { "email": "amit@appgenius.com", "phone": "+91-9000012345" },
    "user": {
      "name": "Amit Sharma",
      "profile_picture": "https://randomuser.me/api/portraits/men/52.jpg",
      "role": "developer",
      "is_verified": "true"
    }
  },
  {
    "gig_id": "5",
    "title": "SEO Optimization",
    "description": "Rank your website higher with proven SEO techniques.",
    "category": "Marketing",
    "min_price": 100.00,
    "avg_price": 250.00,
    "location": "Delhi, India",
    "rating": 4.5,
    "picture": "https://picsum.photos/600/400?5",
    "contact_info": { "email": "jenny@seoexpert.com" },
    "user": {
      "name": "Jenny Patel",
      "profile_picture": "https://randomuser.me/api/portraits/women/55.jpg",
      "role": "seo specialist",
      "is_verified": "false"
    }
  },
  {
    "gig_id": "6",
    "title": "Content Writing",
    "description": "Engaging blog posts, articles, and web content for your brand.",
    "category": "Writing",
    "min_price": 40.00,
    "avg_price": 90.00,
    "location": "Remote",
    "rating": 4.3,
    "picture": "https://picsum.photos/600/400?6",
    "contact_info": { "email": "kiran@wordcraft.com" },
    "user": {
      "name": "Kiran Verma",
      "profile_picture": "https://randomuser.me/api/portraits/men/65.jpg",
      "role": "writer",
      "is_verified": "false"
    }
  },
  {
    "gig_id": "7",
    "title": "Video Editing",
    "description": "Professional video edits, transitions, and effects.",
    "category": "Video",
    "min_price": 150.00,
    "avg_price": 300.00,
    "location": "Pune, India",
    "rating": 4.7,
    "picture": "https://picsum.photos/600/400?7",
    "contact_info": { "phone": "+91-9112233445" },
    "user": {
      "name": "Mohit Singh",
      "profile_picture": "https://randomuser.me/api/portraits/men/72.jpg",
      "role": "editor",
      "is_verified": "true"
    }
  },
  {
    "gig_id": "8",
    "title": "UI/UX Design",
    "description": "Craft user-friendly and modern designs for websites & apps.",
    "category": "Design",
    "min_price": 120.00,
    "avg_price": 250.00,
    "location": "Chennai, India",
    "rating": 4.9,
    "picture": "https://picsum.photos/600/400?8",
    "contact_info": { "email": "riya@uxstudio.com" },
    "user": {
      "name": "Riya Kapoor",
      "profile_picture": "https://randomuser.me/api/portraits/women/29.jpg",
      "role": "designer",
      "is_verified": "true"
    }
  },
  {
    "gig_id": "9",
    "title": "Data Analysis",
    "description": "Turn raw data into actionable insights using Python & SQL.",
    "category": "Data Science",
    "min_price": 200.00,
    "avg_price": 350.00,
    "location": "Remote",
    "rating": 4.8,
    "picture": "https://picsum.photos/600/400?9",
    "contact_info": { "email": "vikas@datainsights.com" },
    "user": {
      "name": "Vikas Gupta",
      "profile_picture": "https://randomuser.me/api/portraits/men/80.jpg",
      "role": "data analyst",
      "is_verified": "true"
    }
  },
  {
    "gig_id": "10",
    "title": "Voice Over Artist",
    "description": "High-quality voice overs for ads, YouTube, and podcasts.",
    "category": "Voice",
    "min_price": 60.00,
    "avg_price": 120.00,
    "location": "Remote",
    "rating": 4.6,
    "picture": "https://picsum.photos/600/400?10",
    "contact_info": { "email": "ananya@voicepro.com", "phone": "+91-8887776666" },
    "user": {
      "name": "Ananya Das",
      "profile_picture": "https://randomuser.me/api/portraits/women/38.jpg",
      "role": "voice artist",
      "is_verified": "false"
    }
  }
]

from pine import pc

def upload_data_to_pinecone():
    """
    Uploads users and gigs data to Pinecone dense users_index using integrated embedding.
    Returns a status dict.
    """
    try:
        stats = index.describe_index_stats()
        if stats["total_vector_count"] > 0:
            return {"status": "already_uploaded", "message": "index already has data"}


        # Prepare user records
    #     for user in users:

    #         records.append({
    #     "_id": user["user_id"],  # use UUID as unique ID
    #     "chunk_text": f"{user['name']} {user['email']} {user.get('phone', '')} {user.get('bio', '')} {user['role']}",
    #     "type": "user",
    #     "name": str(user["name"]),
    #     "email": str(user["email"]),
    #     "phone": str(user.get("phone", "")),
    #     "profile_picture": str(user.get("profile_picture", "")),
    #     "bio": str(user.get("bio", "")),
    #     "merit_credits": int(user.get("merit_credits", 0)),
    #     "is_verified": bool(user.get("is_verified", False)),
    #     "role": str(user.get("role", "user")),
    #     "created_at": str(user.get("created_at", "")),
    #     "updated_at": str(user.get("updated_at", "")),
    #    })


        # Prepare gig records
        records = []
        for gig in gigs:
          
          user_data = gig.get("user", {})
          contact_info = gig.get("contact_info", {})

          records.append({
        "_id": str(gig.get("gig_id", "")),
        "chunk_text": f"{gig.get('title', '')} {gig.get('description', '')}".strip(),
        "type": "gig",
        "title": gig.get("title", ""),
        "description": gig.get("description", ""),
        "category": gig.get("category", ""),
        "min_price": float(gig.get("min_price") or 0),
        "avg_price": float(gig.get("avg_price") or 0),
        "rating": float(gig.get("rating") or 0),
        "location": gig.get("location", ""),
        "picture": gig.get("picture", ""),

        # Flattened contact_info
        "contact_email": contact_info.get("email", ""),
        "contact_phone": contact_info.get("phone", ""),

        # Flattened user fields
        "user_name": user_data.get("name", ""),
        "user_profile_picture": user_data.get("profile_picture", ""),
        "user_role": user_data.get("role", ""),
        # Cast properly so "true"/"false" strings become bools
        "user_is_verified": str(user_data.get("is_verified", "")).lower() == "true"
         })

        # Upsert records into the default namespace
        namespace = "__default__"
        index.upsert_records(namespace, records)

        return {"status": "success", "msg": f"Uploaded {len(records)} users + gigs to Pinecone"}

    except Exception as e:
        return {"status": "error", "msg": str(e)}


def upload_data_to_pinecone_gig(gig):
    """
    Uploads a single gig (with user & contact info) to Pinecone.
    Only metadata is stored here (no embedding).
    """
    try:
        user_data = gig.get("user", {}) or {}
        contact_info = gig.get("contact_info", {}) or {}

        record = {
            "_id": str(gig.get("gig_id") or gig.get("id") or ""),
            "chunk_text": f"{gig.get('title', '')} {gig.get('description', '')}".strip(),
            "type": "gig",
            "title": gig.get("title", "") or "",
            "description": gig.get("description", "") or "",
            "category": gig.get("category", "") or "",
            "min_price": float(gig.get("min_price") or 0),
            "avg_price": float(gig.get("avg_price") or 0),
            "rating": float(gig.get("rating") or 0),
            "location": gig.get("location", "") or "",
            "picture": gig.get("picture", "") or "",

            # Flattened contact_info (force empty string if missing)
            "contact_email": contact_info.get("email") or "",
            "contact_phone": contact_info.get("phone") or "",

            # Flattened user fields
            "user_name": user_data.get("name") or "",
            "user_profile_picture": user_data.get("profile_picture") or "",
            "user_role": user_data.get("role") or "",
            "user_is_verified": bool(user_data.get("is_verified", False)),
        }

        namespace = "__default__"

        # ⚠️ Depending on Pinecone SDK
        index.upsert_records(namespace, [record])   # new wrapper
        # index.upsert([record], namespace=namespace)  # old client

        return {"status": "success", "msg": f"Uploaded gig {record['_id']} to Pinecone"}

    except Exception as e:
        return {"status": "error", "msg": str(e)}


# def upload_data_to_pinecone_user(user: dict):
#     """
#     Uploads a single user (with metadata) to Pinecone.
#     Only metadata is stored here (no embedding).
#     """
#     try:
#         record = {
#             "_id": str(user.get("user_id") or user.get("id") or ""),
#             "chunk_text": f"{user.get('name', '')} {user.get('email', '')} {user.get('phone', '')} {user.get('bio', '')} {user.get('role', '')}".strip(),
#             "type": "user",
#             "name": str(user.get("name") or ""),
#             "email": str(user.get("email") or ""),
#             "phone": str(user.get("phone") or ""),
#             "profile_picture": str(user.get("profile_picture") or ""),
#             "bio": str(user.get("bio") or ""),
#             "merit_credits": int(user.get("merit_credits") or 0),
#             "is_verified": bool(user.get("is_verified") or False),
#             "role": str(user.get("role") or "user"),
#             "created_at": str(user.get("created_at") or ""),
#             "updated_at": str(user.get("updated_at") or ""),
#         }

#         namespace = "__default__"

#         # ⚠️ Depending on Pinecone SDK version
#         users_index.upsert_records(namespace, [record])   # new wrapper
#         # users_index.upsert([record], namespace=namespace)  # old client

#         return {"status": "success", "msg": f"Uploaded user {record['_id']} to Pinecone"}

#     except Exception as e:
#         return {"status": "error", "msg": str(e)}
def upload_data_to_pinecone_user(user: dict):
    """
    Uploads a single user (with metadata) to Pinecone.
    If user exists -> update
    If not -> insert
    """
    try:
        user_id = str(user.get("user_id") or user.get("id") or "")
        if not user_id:
            return {"status": "error", "msg": "User ID is required"}

        record = {
            "_id": user_id,
            "chunk_text": f"{user.get('name', '')} {user.get('email', '')} {user.get('phone', '')} {user.get('bio', '')} {user.get('role', '')}".strip(),
            "type": "user",
            "name": str(user.get("name") or ""),
            "email": str(user.get("email") or ""),
            "phone": str(user.get("phone") or ""),
            "profile_picture": str(user.get("profile_picture") or ""),
            "bio": str(user.get("bio") or ""),
            "merit_credits": int(user.get("merit_credits") or 0),
            "is_verified": bool(user.get("is_verified") or False),
            "role": str(user.get("role") or "user"),
            "created_at": str(user.get("created_at") or ""),
            "updated_at": str(user.get("updated_at") or ""),
        }

        namespace = "__default__"

        # 🔎 Step 1: Check if user already exists
        existing = users_index.fetch(ids=[user_id], namespace=namespace)

        # 🔄 Step 2: Upsert (insert or update)
        users_index.upsert_records(namespace, [record])

        # Step 3: Return correct message
        if hasattr(existing, "records") and existing.records:   # ✅ fixed
            return {"status": "success", "msg": f"Updated user {user_id} in Pinecone"}
        else:
            return {"status": "success", "msg": f"Inserted new user {user_id} in Pinecone"}

    except Exception as e:
        return {"status": "error", "msg": str(e)}



def upload_text_to_pinecone(raw_text: str, doc_id: str = "User_manual", source: str = "manual", doc_type: str = "general"):
    """
    Uploads raw text (split into chunks) into Pinecone with auto-embedding (v3 upsert_records style).
    """
    try:
        def chunk_text(text, chunk_size=500, overlap=50):
            chunks = []
            start = 0
            while start < len(text):
                end = start + chunk_size
                chunks.append(text[start:end].strip())
                start += chunk_size - overlap
            return chunks

        chunks = chunk_text(raw_text)

        records = []
        for i, chunk in enumerate(chunks):
            records.append({
                "_id": f"{doc_id}-{i}",   # 👈 must be `_id` for v3 upsert_records
                "chunk_text": chunk,      # 👈 this will be auto-embedded (because of field_map)
                "text": chunk,            # 👈 optional if your field_map uses "text"
                "source": source,
                "doc_type": doc_type,
                "doc_id": doc_id,
            })

        # ✅ New SDK style
        retriever.upsert_records("__default__", records)

        return {"status": "success", "msg": f"Uploaded {len(chunks)} chunks for {doc_id}"}

    except Exception as e:
        return {"status": "error", "msg": str(e)}

def update_policy_to_pinecone(raw_text: str, doc_id: str = "User_manual", source: str = "manual", doc_type: str = "general"):
    """
    Upserts a policy into Pinecone.
    If the doc_id already exists → updates it.
    Otherwise → inserts a new entry.
    """
    try:
        def chunk_text(text, chunk_size=500, overlap=50):
            chunks = []
            start = 0
            while start < len(text):
                end = start + chunk_size
                chunks.append(text[start:end].strip())
                start += chunk_size - overlap
            return chunks

        chunks = chunk_text(raw_text)

        records = []
        for i, chunk in enumerate(chunks):
            records.append({
                "_id": f"{doc_id}-{i}",   # same id → ensures overwrite on update
                "chunk_text": chunk,
                "text": chunk,
                "source": source,
                "doc_type": doc_type,
                "doc_id": doc_id,
            })

        # Upsert = insert or update
        retriever.upsert_records("__default__", records)

        return {
            "status": "success",
            "msg": f"Upserted {len(chunks)} chunks for policy {doc_id}"
        }

    except Exception as e:
        return {"status": "error", "msg": str(e)}
