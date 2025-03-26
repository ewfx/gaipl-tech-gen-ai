# Filename: main.py

from fastapi import FastAPI
from pydantic import BaseModel
import openai
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for local testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OpenAI API Key (use env variables in production)
openai.api_key = "your_openai_api_key"

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate")
async def generate_text(request: PromptRequest):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": request.prompt}],
    )
    return {"response": response["choices"][0]["message"]["content"]}
