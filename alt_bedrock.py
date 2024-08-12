import boto3
import json
import logging
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import os
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_community.chat_models import BedrockChat

load_dotenv()

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

os.environ["AWS_PROFILE"] = "Nateuser"


bedrock_runtime = boto3.client('bedrock-runtime', region_name='us-west-2')

modelID = "anthropic.claude-3-sonnet-20240229-v1:0"

def generate_message(bedrock_runtime, model_id, system_prompt, messages, max_tokens):
    body = json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": max_tokens,
        "system": system_prompt,
        "messages": messages
    })

    response = bedrock_runtime.invoke_model(body=body, modelId=model_id)
    response_body = json.loads(response.get('body').read())
   
    return response_body

llm = BedrockChat(
    model_id=modelID,
    client=bedrock_runtime,
    model_kwargs={"max_tokens": 2000, "temperature": 0.9}
)

def my_chatbot(language, freeform_text):
    prompt = PromptTemplate(
        input_variables=["language", "freeform_text"],
        template="You are a chatbot. You are in {language}.\n\n{freeform_text}"
    )

    bedrock_chain = LLMChain(llm=llm, prompt=prompt)

    response = bedrock_chain({'language': language, 'freeform_text': freeform_text})
    return response

def main():
    try:
        # Example 1: User turn only
        system_prompt = "You are a helpful assistant."
        max_tokens = 1000
        user_message = {"role": "user", "content": "What country is San Francisco located?"}
        messages = [user_message]

        response = generate_message(bedrock_runtime, modelID, system_prompt, messages, max_tokens)
        print("User turn only:")
        print(json.dumps(response, indent=4))

        # Example 2: Using my_chatbot function
        chatbot_response = my_chatbot("Spanish", "Tell me a joke")
        print("\nChatbot response:")
        print(chatbot_response['text'])

    except ClientError as err:
        message = err.response["Error"]["Message"]
        logger.error("A client error occurred: %s", message)
        print("A client error occurred: " + message)

if __name__ == "__main__":
    main()