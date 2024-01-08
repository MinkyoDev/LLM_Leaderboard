from langchain.prompts.prompt import PromptTemplate


conversation_chain_suffix = """
Human: {input}
AI Assistant:
"""

chatbot_template = conversation_chain_suffix
chatbot_prompt = PromptTemplate(template=chatbot_template, input_variables=["input"])