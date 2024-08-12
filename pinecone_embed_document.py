from dotenv import load_dotenv
from langchain_pinecone import PineconeEmbeddings, PineconeVectorStore
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os
import asyncio
from langchain.schema import Document
from pinecone.grpc import PineconeGRPC as Pinecone

import openai 

load_dotenv()

# chunking
async def chunk_and_embed_document():
    try:
        text = ""
        with open("./test.txt", 'r') as file:
            text = file.read()

        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=500,
            chunk_overlap=0,
            length_function=len
        )

        chunks = text_splitter.split_text(text)
        # print("Number of chunks:", chunks)
        data = [{"id": f"vec{i}", "text": chunk} for i, chunk in enumerate(chunks)]
        # print(data)
        # documents = [Document(page_content=chunk) for chunk in chunks]
        # print(documents)
        def embed(docs: list[str]) -> list[list[float]]:
            res = openai.embeddings.create(
                input=docs,
                model="text-embedding-ada-002"
            )
            doc_embeds = [r.embedding for r in res.data] 
            return doc_embeds 


        doc_embeds = embed([d["text"] for d in data])

        vectors = []
        for d, e in zip(data, doc_embeds):
            vectors.append({
                "id": d['id'],
                "values": e,
                "metadata": {'text': d['text']}
            })

        
        pc = Pinecone(api_key=os.environ.get("PINECONE_API_KEY"))
        index = pc.Index("chatters")
        
        index.upsert(
            vectors=vectors,
            namespace="ns1"
        )
        query = "Tell me about RAG"

        x = embed([query])

        results = index.query(
            namespace="ns1",
            vector=x[0],
            top_k=3,
            include_values=False,
            include_metadata=True
        )

        print(results)
     
        
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(chunk_and_embed_document())
