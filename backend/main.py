import json

import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from lib.ai_service import ask_ai

app = FastAPI()  # FastAPI instance

# CORS config (cross origin resource sharing)
# switch "*" with frontend domain if in production
# Example: ["https://frontend-domain.com"]
# For development we can use ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load dummy data
with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)


@app.get("/api/sales-reps")
def get_data():
    """
    Returns dummy data (e.g., list of users).
    """
    return DUMMY_DATA


# API Test
@app.get("/api/ping")
def test_endpoint():
    """
    Returns dummy data (e.g., list of users).
    """
    return "Hello, your backend is working!"


@app.post("/api/ai")
async def ai_endpoint(request: Request):

    body = await request.json()
    user_question = body.get("question")  # get question from frontend

    # Validate input return error if empty
    if not user_question:
        return {"error": "No question provided"}

    ai_response = await ask_ai(user_question)

    # if AI Response starts with ("error":) not ("answer":)
    if ai_response.startswith("Error"):
        return {"error": ai_response}

    return {"answer": ai_response}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
