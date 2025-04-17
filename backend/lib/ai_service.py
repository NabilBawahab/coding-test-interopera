import asyncio
import json
from os import getenv

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=getenv("OPENAI_API_KEY"),
)

with open("dummyData.json", "r") as f:
    DUMMY_DATA = json.load(f)


async def ask_ai(user_question):
    try:
        completion = client.chat.completions.create(
            model="mistralai/mistral-small-3.1-24b-instruct:free",
            messages=[
                {
                    "role": "system",
                    "content": f"You are the secretary/personal assistant of the user. currently, you are ordered to analyzed JUST based on this JSON data:{DUMMY_DATA}, this is the data from the company. IMPORTANT: THE OUTPUT MUST BE CONCISE, CLEAR AND PROFESSIONAL AND NO UNNECESSARY OR OVER EXPLANATION, NO ** OR OTHER MARKDOWN FORMAT, NO NEXT ACTION SUGGESTION, DO NOT INFORM USER ABOUT DATA ID.",
                },
                {"role": "user", "content": user_question},
            ],
        )
        result = completion.choices[0].message.content

        return result
    except Exception as e:
        print(f"Error: {e}")
        return f"Error from AI: {e}"


if __name__ == "__main__":

    async def main():
        response = await ask_ai()
        print(response)

    asyncio.run(main())
