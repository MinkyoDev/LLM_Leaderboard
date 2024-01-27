from fastapi import APIRouter

from domain.management.management_schema import testSchema


router = APIRouter(
    prefix="/api/management",
)


@router.post("/test", 
             description="통신 테스트를 위한 API 입니다.", 
             tags=["management"])
async def API_test(test_schema: testSchema):
    print(f"input : {test_schema.content}")
    print(f"model : {test_schema.model}")

    final_response = {
        "answer": test_schema.content, 
    }
    return final_response


@router.get("/model_list", 
             description="지원하는 모델의 리스트를 조회하기 위한 API 입니다.", 
             tags=["management"])
async def model_list():
    final_response = {
        "Langchain": {
            "models": ["gpt-3.5-turbo-1106", "gpt-4", "gpt-4-1106-preview"],
            "api": '/api/chatbot/langchain'
            }, 
        # "Gemini": {
        #     "models": ["gemini"],
        #     "api": '/api/chatbot/gemini'
        #     }, 
        "OpenAI": {
            "models": ["gpt-3.5-turbo-1106", "gpt-4", "gpt-4-1106-preview"],
            "api": '/api/chatbot/openai'
            }, 
    }
    return final_response