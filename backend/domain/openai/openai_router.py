from fastapi import APIRouter

from domain.openai.openai_schema import GeneratorSchema
from LLMs.openai.openai_ import openai_api


router = APIRouter(
    prefix="/api/chatbot",
)


@router.post("/openai", 
             description="OpenAI API를 이용한 챗봇입니다. model은 'gpt-3.5-turbo-1106', 'gpt-4', 'gpt-4-1106-preview'가 있습니다.", 
             tags=["LLMs", "openai"])
async def langchain_generator(generator_schema: GeneratorSchema):
    print(f"input : {generator_schema.content}")
    print(f"model : {generator_schema.model}")
    print(f"secretKey : {generator_schema.secretKey}")
    
    answer, tokens, execution_time = openai_api(generator_schema.content, generator_schema.model, generator_schema.secretKey)

    final_response = {
        "answer": {
            "text": answer, 
            "tokens": tokens, 
            "executionTime": execution_time, 
        }
    }

    print(final_response)
    return final_response
