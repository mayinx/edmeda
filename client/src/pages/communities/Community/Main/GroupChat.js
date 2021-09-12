import MessageList from "./GroupChat/MessageList";
import MessageInput from "./GroupChat/NewMessageForm";
import "./GroupChat.css";

import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";

import pkgJSON from "../../../../../package.json";

export default function GroupChat(props) {
  // FYI: Uses "http://localhost:4000"in dev as socket endpoint
  const socketURL =
    process.env.NODE_ENV === "production"
      ? window.location.hostname
      : pkgJSON.proxy;

  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const { currentGroup } = props;
  const groupId = currentGroup._id;

  useEffect(() => {
    if (!groupId) return;

    // open a web socket connection
    const newSocket = io(socketURL, {
      query: { groupId: props.currentGroup._id },
    });
    // const newSocket = io(socketURL);
    if (!newSocket) return;
    setSocket(newSocket);

    // fired by the Socket instance upon
    // connection AND reconnection.
    newSocket.on("connect", () => {
      // JOIN GROUP CHAT
      // TODO: add currentUserID
      if (newSocket && groupId) {
        newSocket.emit("join", { groupId: groupId, userId: null }, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });

    // On init event fired from server:
    // Load the last 10 messages in the window.
    newSocket.on("init", (messages) => {
      setMessages(messages);
      scrollToBottom();
    });

    // TODO: User Notification!
    newSocket.on("error", (error) => {
      console.log("[CLIENT] ON ERROR");
      console.log("--- an server side error occured: ", error);
    });

    // Update the chat if a new message is broadcasted.
    newSocket.on("push", (msg) => {
      setMessages((prevMessages) => {
        return [...prevMessages, msg];
      });
    });
    return () => {
      if (newSocket) {
        newSocket.emit("leave", { groupId: groupId, userId: null });
        newSocket.disconnect();
      }
    };
  }, [groupId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <section className="GroupChat">
      <section className="GroupChat__Hero">
        <div className="heading">
          <h2 className="title">{currentGroup.name}: Group Chat</h2>
          <h3 className="subtitle">
            Welcome to the <strong>{currentGroup.name}'s group chat</strong>.
            Enjoy chatting!
          </h3>
        </div>
      </section>

      {socket ? (
        <>
          <section className="GroupChat__Main">
            <MessageList messages={messages} socket={socket} />
            <div ref={messagesEndRef} />
          </section>
          <MessageInput socket={socket} currentGroup={currentGroup} />
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </section>
  );
}
