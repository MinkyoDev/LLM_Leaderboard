import vertexai
from vertexai.preview.generative_models import GenerativeModel
import asyncio
from pathlib import Path
import re, time, os

current_file_path = Path(__file__).resolve()
current_directory = current_file_path.parent.parent.parent
file_path = current_directory / Path("resources/secret") / "gemini-api-410603-b4ee00038dea.json"
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = file_path.as_posix()

location = "asia-northeast1"
project_id = "gemini-api-410603"

vertexai.init(project=project_id, location=location)


def parse_to_dict(text):
    # 불필요한 공백과 줄바꿈 제거
    text = text.strip().replace("\n", "")

    # 중괄호로 감싸진 부분을 찾아서 재귀적으로 파싱
    def parse_object(text):
        obj = {}
        while text:
            # 키-값 쌍 찾기
            match = re.search(r"(\w+): ([\w\"]+|\{[^\}]*\})", text)
            if not match:
                break
            key, value = match.groups()

            # 값이 중괄호로 시작한다면, 중괄호 안의 내용을 재귀적으로 파싱
            if value.startswith("{"):
                value = parse_object(value[1:-1])
            else:
                value = value.strip("\"")

            obj[key] = value
            text = text[match.end():].strip()
        return obj

    return parse_object(text[1:-1])


async def execute_conversation(prompts, model_name):
    start_time = time.time()

    model = GenerativeModel(model_name)
    loop = asyncio.get_running_loop()
    response = await loop.run_in_executor(None, model.generate_content, prompts)
    response_dict = parse_to_dict(str(response))
    tokens = {"totalTokens": int(response_dict["total_token_count"]), 
            "promptTokens": int(response_dict["prompt_token_count"]), 
            "completionTokens": int(response_dict["candidates_token_count"]), 
            }

    end_time = time.time()
    execution_time = round(end_time - start_time, 3)

    return response, tokens, execution_time


async def chat_gemini(prompts, model_name):
    response, tokens, execution_time = await execute_conversation(prompts, model_name)
    finish_reason = str(response.candidates[0].finish_reason).split('.')[-1]

    if response.candidates[0].safety_ratings[0].blocked:
        answer = "WARNING: 제공된 요청은 우리의 안전 기준에 따라 처리할 수 없는 내용을 포함하고 있습니다. 괴롭힘과 관련된 내용은 지원하지 않습니다."
        return answer, finish_reason
    if response.candidates[0].safety_ratings[1].blocked:
        answer = "WARNING: 제공된 요청에 증오 발언이 포함되어 있어 우리의 안전 기준에 따라 처리할 수 없습니다."
        return answer, finish_reason
    if response.candidates[0].safety_ratings[2].blocked:
        answer = "WARNING: 제공된 요청은 성적으로 명시적인 내용을 포함하고 있어, 우리의 안전 기준에 따라 처리할 수 없습니다."
        return answer, finish_reason
    if response.candidates[0].safety_ratings[3].blocked:
        answer = "WARNING: 제공된 요청은 우리의 안전 기준에 따라 처리할 수 없는 위험한 내용을 포함하고 있습니다."
        return answer, finish_reason

    if response.candidates and response.candidates[0].content.parts:
        answer = response.text
        return answer, tokens, execution_time
    else:
        return "No response generated", "Unknown"