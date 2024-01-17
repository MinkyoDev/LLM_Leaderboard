from fastapi import APIRouter, HTTPException

from domain.gemini.gemini_schema import GeneratorSchema
from LLMs.gemini import gemini


router = APIRouter(
    prefix="/api/chatbot",
)


@router.post("/gemini", 
             description="Gemini를 이용한 챗봇입니다.", 
             tags=["LLMs"])
async def gemini_generator(generator_schema: GeneratorSchema):
    print(f"input : {generator_schema.content}")
    print(f"model : {generator_schema.model}")
    
    while True:
        try:
            answer, tokens, execution_time = await gemini.chat_gemini(generator_schema.content, generator_schema.model)
            break
        except IndexError as e:
            print("#"*10 + "I got IndexError...Try again!" + str(e) + "#"*10)

    final_response = {
        "answer": {
            "text": answer, 
            "tokens": tokens, 
            "executionTime": execution_time, 
        }
    }
    print(final_response)
    return final_response