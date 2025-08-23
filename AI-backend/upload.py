from pine import users_index
import uuid
users_data = [
    {
        "id": "u1",
        "name": "Rohit Sharma",
        "skills": ["Plumbing", "Pipe Fitting"],
        "location": "Delhi",
        "gig": "Expert in bathroom fittings and leak repairs",
        "experience": "5 years"
    },
    {
        "id": "u2",
        "name": "Ananya Verma",
        "skills": ["Home Cleaning", "Sanitization"],
        "location": "Mumbai",
        "gig": "Deep cleaning specialist for homes and offices",
        "experience": "3 years"
    },
    {
        "id": "u3",
        "name": "Vikas Singh",
        "skills": ["Electrician", "Wiring"],
        "location": "Bangalore",
        "gig": "Certified electrician for wiring, fan, AC installation",
        "experience": "7 years"
    },
    {
        "id": "u4",
        "name": "Meera Iyer",
        "skills": ["Makeup", "Bridal Makeup"],
        "location": "Chennai",
        "gig": "Professional bridal and party makeup artist",
        "experience": "4 years"
    },
    {
        "id": "u5",
        "name": "Amit Khanna",
        "skills": ["Carpentry", "Furniture Assembly"],
        "location": "Hyderabad",
        "gig": "Custom furniture maker and carpenter",
        "experience": "6 years"
    },
    {
        "id": "u6",
        "name": "Priya Nair",
        "skills": ["Massage", "Spa"],
        "location": "Kochi",
        "gig": "Certified spa therapist for relaxing massages",
        "experience": "8 years"
    },
    {
        "id": "u7",
        "name": "Rahul Mehta",
        "skills": ["AC Repair", "Refrigerator Repair"],
        "location": "Gurgaon",
        "gig": "Expert in AC gas refill and fridge repair",
        "experience": "5 years"
    },
    {
        "id": "u8",
        "name": "Sneha Kapoor",
        "skills": ["Cooking", "Home Chef"],
        "location": "Pune",
        "gig": "Home chef for healthy tiffin and catering services",
        "experience": "2 years"
    },
    {
        "id": "u9",
        "name": "Arjun Das",
        "skills": ["Painting", "Interior Work"],
        "location": "Kolkata",
        "gig": "Professional wall painter and wallpaper expert",
        "experience": "10 years"
    },
    {
        "id": "u10",
        "name": "Simran Kaur",
        "skills": ["Fitness", "Yoga"],
        "location": "Delhi",
        "gig": "Certified yoga trainer for personal sessions",
        "experience": "6 years"
    },
    {
        "id": "u11",
        "name": "Karan Patel",
        "skills": ["Driving", "Car Rental"],
        "location": "Ahmedabad",
        "gig": "Personal driver and car rental services",
        "experience": "4 years"
    },
    {
        "id": "u12",
        "name": "Neha Sharma",
        "skills": ["Nanny", "Babysitting"],
        "location": "Mumbai",
        "gig": "Professional babysitter with CPR certification",
        "experience": "3 years"
    },
    {
        "id": "u13",
        "name": "Rajiv Ranjan",
        "skills": ["Gardening", "Landscaping"],
        "location": "Patna",
        "gig": "Garden design and maintenance services",
        "experience": "7 years"
    },
    {
        "id": "u14",
        "name": "Divya Joshi",
        "skills": ["Event Planning", "Decoration"],
        "location": "Jaipur",
        "gig": "Wedding planner and decorator",
        "experience": "5 years"
    },
    {
        "id": "u15",
        "name": "Suresh Kumar",
        "skills": ["Mechanic", "Bike Repair"],
        "location": "Lucknow",
        "gig": "Expert in two-wheeler servicing and repair",
        "experience": "9 years"
    },
    {
        "id": "u16",
        "name": "Pooja Singh",
        "skills": ["Teaching", "Tutoring"],
        "location": "Indore",
        "gig": "Math and Science tutor for school students",
        "experience": "4 years"
    },
    {
        "id": "u17",
        "name": "Aditya Rao",
        "skills": ["Photography", "Videography"],
        "location": "Goa",
        "gig": "Wedding and event photographer",
        "experience": "6 years"
    },
    {
        "id": "u18",
        "name": "Nisha Gupta",
        "skills": ["Catering", "Baking"],
        "location": "Delhi",
        "gig": "Catering services and custom cakes",
        "experience": "3 years"
    },
    {
        "id": "u19",
        "name": "Manoj Yadav",
        "skills": ["Security", "Bodyguard"],
        "location": "Noida",
        "gig": "Personal security and bouncer services",
        "experience": "12 years"
    },
    {
        "id": "u20",
        "name": "Shweta Mishra",
        "skills": ["Pet Care", "Dog Walking"],
        "location": "Bhopal",
        "gig": "Pet grooming and daily dog walking services",
        "experience": "2 years"
    }
]
gigs_data = [
    {
        "id": str(uuid.uuid4()),
        "title": "Urban Logo Design",
        "description": "Create a modern logo for your urban brand.",
        "price": 50,
        "rating": 4.8,
        "category": "Design"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "City Photography Session",
        "description": "Professional outdoor photography in urban locations.",
        "price": 100,
        "rating": 4.6,
        "category": "Photography"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Social Media Management",
        "description": "Manage your social media accounts with trendy posts.",
        "price": 200,
        "rating": 4.7,
        "category": "Marketing"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Urban Website Design",
        "description": "Design a sleek and modern website for your business.",
        "price": 300,
        "rating": 4.9,
        "category": "Web Development"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Street Style Illustration",
        "description": "Custom digital illustrations inspired by urban fashion.",
        "price": 40,
        "rating": 4.5,
        "category": "Illustration"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "SEO Optimization",
        "description": "Improve your website ranking with targeted urban keywords.",
        "price": 150,
        "rating": 4.6,
        "category": "Marketing"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Event Flyer Design",
        "description": "Create eye-catching flyers for your urban events.",
        "price": 30,
        "rating": 4.4,
        "category": "Design"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Music Beat Production",
        "description": "Produce unique beats for urban music tracks.",
        "price": 80,
        "rating": 4.7,
        "category": "Music"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Urban Video Editing",
        "description": "Edit videos with trendy urban effects and transitions.",
        "price": 120,
        "rating": 4.6,
        "category": "Video Editing"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Street Art Consultation",
        "description": "Advice and guidance on urban street art projects.",
        "price": 60,
        "rating": 4.5,
        "category": "Consulting"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Logo Animation",
        "description": "Animate your logo for urban style videos.",
        "price": 70,
        "rating": 4.6,
        "category": "Animation"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Brand Identity Package",
        "description": "Complete branding package for modern urban brands.",
        "price": 250,
        "rating": 4.9,
        "category": "Design"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Podcast Cover Design",
        "description": "Design covers for podcasts with an urban vibe.",
        "price": 35,
        "rating": 4.5,
        "category": "Design"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Cityscape Digital Painting",
        "description": "Digital paintings inspired by urban cityscapes.",
        "price": 90,
        "rating": 4.7,
        "category": "Illustration"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Online Ad Design",
        "description": "Create ads for social media targeting urban audiences.",
        "price": 45,
        "rating": 4.6,
        "category": "Marketing"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Music Video Storyboard",
        "description": "Storyboard for urban music video production.",
        "price": 55,
        "rating": 4.5,
        "category": "Video Production"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Urban Fashion Illustration",
        "description": "Fashion sketches and illustrations for streetwear brands.",
        "price": 60,
        "rating": 4.7,
        "category": "Illustration"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Street Photography Retouching",
        "description": "Professional editing of street and urban photography.",
        "price": 80,
        "rating": 4.6,
        "category": "Photography"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Social Media Graphics Pack",
        "description": "Pack of trendy social media graphics for urban brands.",
        "price": 50,
        "rating": 4.5,
        "category": "Design"
    },
    {
        "id": str(uuid.uuid4()),
        "title": "Urban Video Ads Production",
        "description": "Produce short urban-style video ads for social media.",
        "price": 150,
        "rating": 4.8,
        "category": "Video Production"
    },
]

from pine import pc
import uuid
def upload_data_to_pinecone():
    """
    Uploads users and gigs data to Pinecone dense users_index using integrated embedding.
    Returns a status dict.
    """
    try:
        stats = users_index.describe_index_stats()
        if stats["total_vector_count"] > 0:
            return {"status": "already_uploaded", "message": "users_index already has data"}

        records = []

        # Prepare user records
        for user in users_data:
            records.append({
                "_id": user["id"],  # use _id as per docs
                "chunk_text": f"{user['name']} {', '.join(user['skills'])} {user['gig']} {user['location']} {user['experience']}",
                "type": "user",
                "name": str(user["name"]),
                "location": str(user["location"]),
                "gig": str(user["gig"]),
                "experience": str(user["experience"]),
                "skills": [str(skill) for skill in user["skills"]],  # list of strings is OK
            })

        # Prepare gig records
        # for gig in gigs_data:
        #     records.append({
        #         "_id": gig["id"],
        #         "chunk_text": f"{gig['title']} {gig['description']}",
        #         "type": "gig",
        #         "title": str(gig["title"]),
        #         "category": str(gig["category"]),
        #         "price": float(gig["price"]),
        #         "rating": float(gig["rating"]),
        #     })

        # Upsert records into the default namespace
        namespace = "__default__"
        users_index.upsert_records(namespace, records)

        return {"status": "success", "msg": f"Uploaded {len(records)} users + gigs to Pinecone"}

    except Exception as e:
        return {"status": "error", "msg": str(e)}
