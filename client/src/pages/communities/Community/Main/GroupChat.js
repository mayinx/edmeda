import MessageList from "./GroupChat/MessageList";
import MessageInput from "./GroupChat/NewMessageForm";
import "./GroupChat.css";

import io from "socket.io-client";
import { useEffect, useState } from "react";

import pkgJSON from "../../../../../package.json";

export default function GroupChat(props) {
  // FYI: Uses "http://localhost:4000"in dev as socket endpoint
  const socketURL =
    process.env.NODE_ENV === "production"
      ? window.location.hostname
      : pkgJSON.proxy;

  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState([]);

  const { currentGroup } = props;
  const groupId = currentGroup._id;

  console.log("groupId", groupId);

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
      console.log("[CLIENT] ON CONNECT!!");
      console.log("--- connecteed to socket: ", newSocket.id);
      console.log("--- attempting to join group: ", groupId);

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

    // TODO: Check - can we pass args here to
    // the server via the socket?
    // newSocket.emit("getGroupMessages", currentGroup._id);

    // On init event fired from server:
    // Load the last 10 messages in the window.
    newSocket.on("init", (messages) => {
      // let msgReversed = messages.reverse();
      console.log("[CLIENT] ON INIT");
      console.log("--- setMessages");
      console.log("--- messages: ", messages);

      setMessages(messages);
      // TODO: scrollToBottom
    });

    // TODO: User Notification!
    newSocket.on("error", (error) => {
      console.log("[CLIENT] ON ERROR");
      console.log("--- an server side error occured: ", error);
    });

    // Update the chat if a new message is broadcasted.
    newSocket.on("push", (msg) => {
      console.log("[CLIENT] ON PUSH", msg);
      console.log("--- add new message");
      setMessages((prevMessages) => {
        // const newMessages = { ...prevMessages, msg };
        // newMessages[message.id] = message;
        //
        // TODO: check!
        // [...prevResources, ...(res.data.docs || [])];
        return [...prevMessages, msg];
      });

      // newSocket.on("disconnecting", function () {
      //   console.log("disconnecting.. ", newSocket.id);
      // });

      // TODO:
      // scrollToBottom
      window.scrollTo(0, document.body.scrollHeight);
    });
    // return () => newSocket.close();
    return () => {
      if (newSocket) {
        newSocket.emit("leave", { groupId: groupId, userId: null });

        newSocket.disconnect();
      }
    };
    // }, [setSocket]);
  }, [groupId]);

  return (
    <section className="GroupChat">
      {/* <h3>Group Chat #{currentGroup.name}</h3> */}

      <section className="GroupChat__Hero">
        <div className="heading">
          <h2 className="title">Group Chat</h2>
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
          </section>
          <MessageInput socket={socket} currentGroup={currentGroup} />
        </>
      ) : (
        <div>Not Connected</div>
      )}
    </section>
  );
}
