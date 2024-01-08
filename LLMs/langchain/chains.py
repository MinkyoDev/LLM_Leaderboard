from pathlib import Path
import os

import dotenv
from langchain.chains import LLMChain
from langchain_openai import ChatOpenAI

from LLMs.langchain import prompts, memory

dotenv_file = dotenv.find_dotenv(str(Path("./").absolute().joinpath(".env")))
dotenv.load_dotenv(dotenv_file)
OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]


def chatbot_(inputs: str, model: str) -> str:
    llm = ChatOpenAI(model=model, openai_api_key=OPENAI_API_KEY)

    chatbot = LLMChain(
        prompt=prompts.chatbot_prompt,
        llm=llm,
        verbose=True,
    )
    return chatbot.predict(input=inputs)