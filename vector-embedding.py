from dotenv import load_dotenv
import os
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

load_dotenv() 
api_key =os.environ["OPENAI_API_KEY"]

from langchain_openai import OpenAIEmbeddings

embeddings_model=OpenAIEmbeddings(model='text-embedding-3-small')

embedded_query=embeddings_model.embed_query("What is the date today?")

embedding_doc=embeddings_model.embed_documents("July","August")

# print(embedding_doc)

loader=TextLoader("./test.txt")

doc=loader.load()

# print(doc)

text_splitter=RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=0,
    length_function=len
)

chunks=text_splitter.split_documents(doc)
# print(len(chunks))

all_embeddings=[embeddings_model.embed_documents(chunk.page_content) for chunk in chunks]
print(all_embeddings)