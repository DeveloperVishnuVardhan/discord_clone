"use client"
import {useState} from "react"
import { api } from "../../convex/_generated/api";
import { Unauthenticated, useMutation, useQuery } from "convex/react";
import { Authenticated } from "convex/react";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  const messages = useQuery(api.functions.messages.list);
  const createMessage1 = useMutation(api.functions.messages.create);
  const createMessage2 = useMutation(api.functions.messages.create);
  const createMessage3 = useMutation(api.functions.messages.create);
  const createMessage3 = useMutation(api.functions.messages.create);

  const [input, setInput] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createMessage1({sender: "Sreekar", content: input})
    setInput("");
  }
  return (
    <>
    <Authenticated>
      <div>
        {messages?.map((message, index) => (
          <div key={index}>
            <strong> {message.sender}</strong>: {message.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input type="text" name="message" id="message" value={input} onChange={e => setInput(e.target.value)}/>
          <button type="submit"> Send </button>
        </form>
      </div>
    </Authenticated>

    <Unauthenticated>
      <SignInButton/>
    </Unauthenticated>
    </>
  );
}
