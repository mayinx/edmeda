import React, { useState } from "react";
import "./MessageInput.css";

export default function MessageInput({ socket }) {
  const [messageContent, setMessageContent] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    console.log("messageContent ", messageContent);
    const newChatMessage = {
      content: messageContent,
    };
    console.log("messageContent ", messageContent);
    console.log("newChatMessage ", newChatMessage);
    // socket.emit("message", messageContent);
    socket.emit("newMessage", newChatMessage);
    setMessageContent("");
  };

  return (
    <form onSubmit={submitForm}>
      <input
        autoFocus
        value={messageContent}
        placeholder="Type your message"
        onChange={(e) => {
          setMessageContent(e.currentTarget.value);
        }}
      />
    </form>
  );
}
