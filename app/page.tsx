"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import Loader  from "@/components/loader";

const Home = () => {
  const [chats, setChats] = useState<any[]>([]);
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [loading,setLoading]=useState<boolean>(false);

  const postQuestion = async (userPrompt: string) => {
    try {
      setChats((prevChats) => [
        ...prevChats,
        { role: "user", content: userPrompt },
      ]);

      setUserPrompt("");
      setLoading(true)

      const response = await axios.post("/api/chat", userPrompt);

      if (Array.isArray(response.data)) {
        setLoading(false)
        setChats((prevChats) => [
          ...prevChats,
          ...response.data.map((message: any) => ({
            role: "Chatters",
            content: message.content,
          })),
        ]);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-amber-50 rounded flex flex-col justify-between gap-3 p-4">
      <div className="overflow-y-auto  mb-4">
        <div
          className="p-2"
          style={{
            display: "flex",
            alignItems: "center",
            width: "fit-content",
            border: "1px solid gray",
            borderRadius: "2rem",

            backgroundColor: "white",
          }}
        >
          <strong>Chatters:</strong> How Can I help you today?
        </div>
     
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`my-2 flex `}
            style={{
              justifyContent: chat.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              className={`p-2 rounded `}
              style={{
                width: "fit-content",
                border: "1px solid gray",
                borderRadius: "2rem",

                backgroundColor: chat.role === "user" ? "" : "white",
              }}
            >
              <strong>{chat.role === "user" ? "You: " : "Chatters: "}</strong>{" "}
              {chat.content}
            </div>
          </div>
        ))}
        {loading && <Loader />}
      </div>
      <div className="flex">
        <Input
          placeholder="Type your message here..."
          value={userPrompt}
          onChange={(e) => setUserPrompt(e.target.value)}
          className="flex-1 bg-white"
        />
        <Button onClick={() => postQuestion(userPrompt)} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default Home;
