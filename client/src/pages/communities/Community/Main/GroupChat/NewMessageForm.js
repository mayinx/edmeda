import React, { useState, useContext } from "react";
import { useFormContext } from "react-hook-form";
import CurrentUserContext from "../../../../../contexts/CurrentUserContext";
import "./NewMessageForm.css";

export default function NewMessageForm(props) {
  const [messageContent, setMessageContent] = useState("");

  const { currentUserData, setCurrentUserData } = useContext(
    CurrentUserContext
  );

  // const createdAt = new Date().toLocaleString() + "";

  const submitForm = (e) => {
    e.preventDefault();
    if (props?.socket) {
      console.log("messageContent ", messageContent);
      const newChatMessage = {
        content: messageContent,
        group: props.currentGroup._id,
        creator: currentUserData?.user?.id,
        createdAt: new Date().toLocaleString() + "",
      };
      console.log("newChatMessage ", newChatMessage);
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
