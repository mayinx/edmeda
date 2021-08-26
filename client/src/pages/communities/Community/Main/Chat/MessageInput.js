import React, { useState } from "react";
import "./MessageInput.css";

export default function MessageInput(props) {
  const [messageContent, setMessageContent] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    console.log("messageContent ", messageContent);
    const newChatMessage = {
      content: messageContent,
      group: props.currentGroup._id,
    };
    console.log("messageContent ", messageContent);
    console.log("newChatMessage ", newChatMessage);
    // socket.emit("message", messageContent);
    props.socket.emit("newMessage", newChatMessage);
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
