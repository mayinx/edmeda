import React, { useState } from "react";
import AuthService from "../../../../../services/auth";
import "./NewMessageForm.css";

export default function NewMessageForm(props) {
  const [messageContent, setMessageContent] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    if (props?.socket) {
      const newChatMessage = {
        content: messageContent,
        group: props.currentGroup._id,
        creator: AuthService.currentUser()?.user?.id,
        createdAt: new Date().toLocaleString() + "",
      };
      props.socket.emit("newMessage", newChatMessage, {
        userId: null,
        groupId: props.currentGroup._id,
      });
      // reset form
      setMessageContent("");
    }
  };

  return (
    <form className="NewMessageForm" onSubmit={submitForm}>
      <input
        autoFocus
        value={messageContent}
        type="text"
        placeholder="What's on your mind?!"
        onChange={(e) => {
          setMessageContent(e.currentTarget.value);
        }}
      />
    </form>
  );
}
