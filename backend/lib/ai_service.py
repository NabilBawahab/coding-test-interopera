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
            model="google/gemini-2.0-flash-exp:free",
            messages=[
                {
                    "role": "system",
                    "content": f"Read this data: {DUMMY_DATA} and explain",
                },
                {"role": "user", "content": user_question},
            ],
        )
        result = completion.choices[0].message.content
        # print(result)
        return result
    except Exception as e:
        print(f"Error: {e}")
        return f"Error from AI: {e}"


if __name__ == "__main__":

    async def main():
        response = await ask_ai()
        print(response)

    asyncio.run(main())
