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
            model="deepseek/deepseek-chat-v3-0324:free",
            messages=[
                {
                    "role": "system",
                    "content": f"You are the secretary/personal assistant of the user. currently, you are ordered to analyzed based on this data:{DUMMY_DATA}, this is the data from the company. IMPORTANT: THE OUTPUT MUST BE CONCISE, CLEAR AND PROFESSIONAL AND NO UNNECESSARY OR OVER EXPLANATION.",
                },
                {"role": "user", "content": user_question},
            ],
        )
        result = completion.choices[0].message.content
        print(f"result: {result}")
        return result
    except Exception as e:
        print(f"Error: {e}")
        return f"Error from AI: {e}"


if __name__ == "__main__":

    async def main():
        response = await ask_ai()
        print(response)

    asyncio.run(main())
