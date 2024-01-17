from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI
from langchain_community.callbacks import get_openai_callback
from pathlib import Path
import os, dotenv, time

from LLMs.langchain import prompts

dotenv_file = dotenv.find_dotenv(str(Path("./").absolute().joinpath(".env")))
dotenv.load_dotenv(dotenv_file)
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]


async def execute_conversation(chain_predict, inputs):
    start_time = time.time()

    with get_openai_callback() as cb:
        response = await chain_predict.ainvoke(input=inputs)
        tokens = {"totalTokens": cb.total_tokens, 
                  "promptTokens": cb.prompt_tokens, 
                  "completionTokens": cb.completion_tokens,
                  "totalCost(USD)": f"${cb.total_cost}"}

    end_time = time.time()
    execution_time = round(end_time - start_time, 3)

    return response, tokens, execution_time

async def chatbot_(inputs: str, model: str) -> str:
    llm = ChatOpenAI(model=model, openai_api_key=OPENAI_API_KEY)

    chatbot = LLMChain(
        prompt=prompts.chatbot_prompt,
        llm=llm,
        verbose=False,
    )
    return await execute_conversation(chatbot, inputs)