import boto3
import json
from dotenv import load_dotenv
import os
load_dotenv()

bedrock_runtime=boto3.client('bedrock-runtime', region_name='us-west-2')

prompt="What is the date today?"

kwargs={
 "modelId": os.getenv("BEDROCK_MODEL_ID"),
 "contentType": "application/json",
 "accept": "application/json",
 "body": json.dumps({"prompt":"this is where you place your input text","max_gen_len":512,"temperature":0.5,"top_p":0.9})
}

res=bedrock_runtime.invoke_model(**kwargs)

body=json.loads(res['body'].read())

print(body)