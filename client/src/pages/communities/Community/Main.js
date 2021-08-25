import "./Main.css";
// import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import Messages from "./Main/Chat/Messages";
import MessageInput from "./Main/Chat/MessageInput";

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

  useEffect(() => {
    // open a web socket connection
    const newSocket = io(socketURL, {
      query: { groupId: props.currentGroup._id },
    });
    setSocket(newSocket);

    newSocket.on("connect", function (socket) {
      console.log("Connected!!");
      console.log("---socket.current.id: ", socket);
    });

    // TODO: Check - can we pass args here to
    // the server via the socket?
    // newSocket.emit("getGroupMessages", props?.currentGroup?._id);

    newSocket.emit("join", { groupId: props.currentGroup._id }, (err) => {
      if (err) {
        alert(err);
      }
    });

    // On init event fired from server:
    // Load the last 10 messages in the window.
    newSocket.on("init", (messages) => {
      // let msgReversed = messages.reverse();
      console.log("on init - setMessages");
      setMessages(messages);
      // TODO: scrollToBottom
    });

    // Update the chat if a new message is broadcasted.
    newSocket.on("push", (msg) => {
      console.log("on push - add new message", msg);
      console.log("on push - add new message");
      console.log("on push - add new message");
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages, msg };
        // newMessages[message.id] = message;
        return newMessages;
      });

      // TODO:
      // scrollToBottom
    });
    // return () => newSocket.close();
    return () => {
      newSocket.disconnect();
    };
    // }, [setSocket]);
  }, [props.currentGroup]);

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
            {props.community?.name} >
            <strong>#{props?.currentGroup?.name}</strong>
          </span>
        </div>
      </section>
      <section className="MainContent">
        <h3>Group Chat #{props?.currentGroup?.name}</h3>

        {socket ? (
          <div className="chat-container">
            <Messages messages={messages} socket={socket} />
            <MessageInput socket={socket} />
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
