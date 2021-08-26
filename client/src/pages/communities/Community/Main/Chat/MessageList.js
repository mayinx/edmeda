import React, { useEffect, useState } from "react";
import "./MessageList.css";

export default function MessageList(props) {
  // const [messages, setMessages] = useState({});

  // useEffect(() => {
  //   const messageListener = (message) => {
  //     console.log("messageListener - setMessages");
  //     setMessages((prevMessages) => {
  //       const newMessages = { ...prevMessages };
  //       newMessages[message.id] = message;
  //       return newMessages;
  //     });
  //   };

  //   const deleteMessageListener = (messageID) => {
  //     console.log("deleteMessageListener - setMessages");
  //     setMessages((prevMessages) => {
  //       const newMessages = { ...prevMessages };
  //       delete newMessages[messageID];
  //       return newMessages;
  //     });
  //   };

  //   socket.on("message", messageListener);
  //   socket.on("deleteMessage", deleteMessageListener);
  //   socket.emit("getMessages");

  //   return () => {
  //     socket.off("message", messageListener);
  //     socket.off("deleteMessage", deleteMessageListener);
  //   };
  // }, [socket]);

  return (
    <div className="MessageList">
      {[...Object.values(props.messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message._id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >
            {/* <span className="user">{message.user.name}:</span> */}
            <span className="message">{message.content}</span>
            <span className="date">
              {new Date(message.time).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  );
}
