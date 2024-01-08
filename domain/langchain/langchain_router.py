from fastapi import APIRouter

from domain.langchain.langchain_schema import GeneratorSchema, ConversationUserSchema, ConversationNPCSchema
from LLMs.langchain import chatbot


router = APIRouter(
    prefix="/api/chatbot",
)


@router.post("/langchain_generator", tags=["conversation_with_user"])
async def intro_generator(generator_schema: GeneratorSchema):
    print(f"input : {generator_schema.content}")
    
    while True:
        try:
            answer = chatbot.chatbot(
                generator_schema.content
            )
            break
        except IndexError as e:
            print("#"*10 + "I got IndexError...Try again!" + "#"*10)

    final_response = {
        "answer": answer, 
    }
    print(f"answer : {answer}")
    return final_response