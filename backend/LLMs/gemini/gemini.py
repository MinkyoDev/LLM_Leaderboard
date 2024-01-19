import google.generativeai as genai
import google.api_core.exceptions
from pathlib import Path
import time, os, dotenv

dotenv_file = dotenv.find_dotenv(str(Path("./").absolute().joinpath(".env")))
dotenv.load_dotenv(dotenv_file)
MY_KEY = os.environ["MY_KEY"]


async def execute_conversation(prompts, model_name, key):
    if key == MY_KEY:
        GOOGLE_API_KEY = os.environ["GOOGLE_API_KEY"]
    else:
        GOOGLE_API_KEY = key

    genai.configure(api_key=GOOGLE_API_KEY)

    start_time = time.time()

    model = genai.GenerativeModel(model_name)
    try:
        if all(char.isalnum() for char in GOOGLE_API_KEY):
            raise
        response = await model.generate_content_async(prompts)
        safety_ratings = response.prompt_feedback.safety_ratings
        response = response.text

        prompt_tokens = model.count_tokens(prompts).total_tokens
        completion_tokens = model.count_tokens(response).total_tokens
    except RuntimeError as e:
        response = "Incorrect API key provided"
        prompt_tokens = 0
        completion_tokens = 0
        safety_ratings = None
    except google.api_core.exceptions.InvalidArgument as e:
        response = e.message
        prompt_tokens = 0
        completion_tokens = 0
        safety_ratings = None
    except Exception as e:
        response = "Unknown error"
        prompt_tokens = 0
        completion_tokens = 0
        safety_ratings = None

    tokens = {"totalTokens": prompt_tokens + completion_tokens, 
            "promptTokens": prompt_tokens, 
            "completionTokens": completion_tokens, 
            }

    end_time = time.time()
    execution_time = round(end_time - start_time, 3)

    return response, tokens, execution_time, safety_ratings


async def chat_gemini(prompts: str, model_name: str, key: str):
    response, tokens, execution_time, safety_ratings = await execute_conversation(prompts, model_name, key)

    if safety_ratings:
        if safety_ratings[0].blocked:
            answer = "WARNING: 제공된 요청은 우리의 안전 기준에 따라 처리할 수 없는 내용을 포함하고 있습니다. 괴롭힘과 관련된 내용은 지원하지 않습니다."
            return answer
        if safety_ratings[1].blocked:
            answer = "WARNING: 제공된 요청에 증오 발언이 포함되어 있어 우리의 안전 기준에 따라 처리할 수 없습니다."
            return answer
        if safety_ratings[2].blocked:
            answer = "WARNING: 제공된 요청은 성적으로 명시적인 내용을 포함하고 있어, 우리의 안전 기준에 따라 처리할 수 없습니다."
            return answer, tokens, execution_time
        if safety_ratings[3].blocked:
            answer = "WARNING: 제공된 요청은 우리의 안전 기준에 따라 처리할 수 없는 위험한 내용을 포함하고 있습니다."
            return answer, tokens, execution_time

    return response, tokens, execution_time