from fastapi import APIRouter

from domain.langchain.langchain_schema import GeneratorSchema
from LLMs.langchain import chains


router = APIRouter(
    prefix="/api/chatbot",
)


@router.post("/langchain", 
             description="langchain을 이용한 챗봇입니다. model은 'gpt-3.5-turbo-1106', 'gpt-4', 'gpt-4-1106-preview'가 있습니다.", 
             tags=["LLMs"])
async def langchain_generator(generator_schema: GeneratorSchema):
    print(f"input : {generator_schema.content}")
    print(f"model : {generator_schema.model}")
    print(f"secretKey : {generator_schema.secretKey}")
    
    while True:
        try:
            answer, tokens, execution_time = await chains.chatbot_(
                generator_schema.content, 
                generator_schema.model, 
                generator_schema.secretKey)
            break
        except IndexError as e:
            print("#"*10 + "I got IndexError...Try again!" + "#"*10)

    final_response = {
        "answer": {
            "text": answer["text"], 
            "tokens": tokens, 
            "executionTime": execution_time, 
        }
    }
    print(final_response)
    return final_response