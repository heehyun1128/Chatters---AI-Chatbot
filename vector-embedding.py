from dotenv import load_dotenv
import os
from langchain_community.document_loaders import TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

load_dotenv() 
api_key =os.environ["OPENAI_API_KEY"]


embeddings_model=OpenAIEmbeddings(model='text-embedding-3-small')

# load text documents into a format that can be processed by the LangChain framework
loader=TextLoader("./test.txt")
doc=loader.load()

# split a large document into smaller chunks of text
text_splitter=RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=0,
    length_function=len
)
chunks=text_splitter.split_documents(doc)

# create a vector representation (embedding) of the chunk's content
all_embeddings=[embeddings_model.embed_documents(chunk.page_content) for chunk in chunks]
print(all_embeddings)