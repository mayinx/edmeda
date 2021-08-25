import "./Main.css";
import { FaRegCaretSquareRight } from "react-icons/fa";
import { FaCaretSquareRight } from "react-icons/fa";
import { Link } from "react-router-dom";

import io from "socket.io-client";
import { useEffect, useState } from "react";

export default function Main(props) {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

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
            {props.community?.name} >{" "}
            <strong>#{props?.currentGroup?.name}</strong>
          </span>
        </div>
      </section>
      <section className="MainContent">
        <h3>Group Chat #{props?.currentGroup?.name}</h3>

        {socket ? (
          <div className="chat-container">
            <Messages socket={socket} />
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
