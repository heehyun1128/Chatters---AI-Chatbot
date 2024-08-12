import asyncio
from flask import Flask, request, jsonify, redirect
from pinecone_index import create_index
from pinecone_embed_document import chunk_and_embed_document
from langchain.chains import RetrievalQA  
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_pinecone import PineconeVectorStore
import os
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf

app = Flask(__name__)
# CORS(app)
CORS(app, origins=["http://localhost:3000"])




@app.route('/query', methods=['POST'])
def query():
    print("working!")
  
    data = request.json
    user_prompt = data.get('userPrompt', '')
    print( "user_prompt",user_prompt)
    # Initialize a LangChain object for chatting with the LLM
    llm = ChatOpenAI(
        openai_api_key=os.environ.get("OPENAI_API_KEY"),
        model_name="gpt-3.5-turbo",
        temperature=0.0
    )
    # print(llm)
# Initialize a LangChain object for retrieving information from Pinecone
    knowledge = PineconeVectorStore.from_existing_index(
        index_name="chatters",
        namespace="ns1",
        embedding=OpenAIEmbeddings(openai_api_key=os.environ["OPENAI_API_KEY"])
    )
    # print(knowledge)
# Initialize a LangChain object for chatting with the LLM with knowledge from Pinecone
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=knowledge.as_retriever()
    )
    # print(qa)
    res=qa.invoke(user_prompt).get("result")
    print("res",res)
    # print("Received a request")
    # data = request.json
    # question = data.get('question', '')
    # print(question)
   
    # result = asyncio.run(qa.invoke(question).get("result"))
    return jsonify({'response': res})

if __name__ == '__main__':
    app.run(debug=True)