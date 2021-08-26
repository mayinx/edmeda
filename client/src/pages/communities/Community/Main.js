import "./Main.css";
// import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import Messages from "./Main/Chat/MessageList";
import MessageInput from "./Main/Chat/NewMessageForm";

import io from "socket.io-client";
import { useEffect, useState } from "react";

import pkgJSON from "../../../../package.json";

export default function Main(props) {
  // FYI: Uses "http://localhost:4000"in dev as socket endpoint
  const socketURL =
    process.env.NODE_ENV === "production"
      ? window.location.hostname
      : pkgJSON.proxy;

  const [socket, setSocket] = useState(null);

  const [messages, setMessages] = useState({});
  const { currentGroup } = props;
  const groupId = currentGroup._id;

  useEffect(() => {
    if (!currentGroup) return;

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
            alert(err);
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
      setMessages(messages);
      // TODO: scrollToBottom
    });

    // Update the chat if a new message is broadcasted.
    newSocket.on("push", (msg) => {
      console.log("[CLIENT] ON PUSH", msg);
      console.log("--- add new message");
      setMessages((prevMessages) => {
        // const newMessages = { ...prevMessages, msg };
        // newMessages[message.id] = message;
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
      if (newSocket) newSocket.disconnect();
    };
    // }, [setSocket]);
  }, [currentGroup]);

  // useEffect(() => {

  // }, [socket])

  return (
    <section className="CommunityMain">
      <section className="MainHeader">
        <Link
          to="#"
          className="CommunityMainHeader__Item ToggleSidebarBtn"
          onClick={props.onSidebarToggle}
        >
          <FaCaretSquareRight className="itemIcon sidebarToggleIcon" />
        </Link>

        <div className="CommunityGroupLabel">
          <span className="GroupIcon"></span>
          <span className="GroupName">
            {props.community?.name} ><strong>#{currentGroup.name}</strong>
          </span>
        </div>
      </section>
      <section className="MainContent">
        <h3>Group Chat #{currentGroup.name}</h3>

        {socket ? (
          <div className="chat-container">
            <Messages messages={messages} socket={socket} />
            <MessageInput socket={socket} currentGroup={currentGroup} />
          </div>
        ) : (
          <div>Not Connected</div>
        )}

        {/* <ul id="messages"></ul>
        <form id="form" action="">
          <input id="input" autocomplete="off" />
          <button>Send</button>
        </form> */}
      </section>
    </section>
  );
}
