import openai
from openai import OpenAI
from pathlib import Path
import dotenv, os, time


dotenv_file = dotenv.find_dotenv(str(Path("./").absolute().joinpath(".env")))
dotenv.load_dotenv(dotenv_file)
MY_KEY = os.environ["MY_KEY"]


def openai_api(inputs: str, model: str, key: str):
    if key == MY_KEY:
        OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]
    elif not key:
        OPENAI_API_KEY = "None"
    else:
        OPENAI_API_KEY = key

    start_time = time.time()

    client = OpenAI(api_key=OPENAI_API_KEY)

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": 'You are a helpful assistant'},
                {"role": "user", "content": inputs}
            ]
        )
        prompt_tokens = response.usage.prompt_tokens
        completion_tokens = response.usage.completion_tokens
        response = response.choices[0].message.content
    except openai.APIError as e:
        response = f"OpenAI API returned an API Error: {e.body['message']}"
        prompt_tokens = 0
        completion_tokens = 0
    except Exception as e:
        response = "Unknown error"
        prompt_tokens = 0
        completion_tokens = 0
        
    end_time = time.time()
    execution_time = round(end_time - start_time, 3)

    tokens = {"totalTokens": prompt_tokens + completion_tokens, 
                "promptTokens": prompt_tokens, 
                "completionTokens": completion_tokens, 
                }
    
    return response, tokens, execution_time