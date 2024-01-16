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
    # print(f"model : {generator_schema.model}")
    
    while True:
        try:
            answer, finish_reason = gemini.chat_gemini(generator_schema.content)
            if finish_reason != "STOP":
                raise HTTPException(status_code=400, detail=f"Unexpected finish reason: {finish_reason}")
            break
        except IndexError as e:
            print("#"*10 + "I got IndexError...Try again!" + e + "#"*10)

    final_response = {
        "answer": answer, 
    }
    print(f"answer : {answer}")
    return final_response