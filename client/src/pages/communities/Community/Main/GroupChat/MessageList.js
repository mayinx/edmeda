import "./MessageList.css";
import Avatar, { genConfig } from "react-nice-avatar";

export default function MessageList(props) {
  function UserAvatar() {
    const config = genConfig(Avatar);
    config.bgColor = "#b5cfd8";
    return (
      <Avatar
        className="UserAvatar"
        style={{ width: "2.5rem", height: "2.5rem" }}
        {...config}
      />
    );
  }

  return (
    <div className="MessageList">
      {console.log(props.messages)}
      {[...Object.values(props.messages)]
        // .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message._id}
            className="Message"
            title={`Sent at ${new Date(
              message.createdAt
            ).toLocaleTimeString()}`}
          >
            {/* <span className="user">{message.user.name}:</span> */}
            <span className="user">
              <UserAvatar />
            </span>
            <span className="content">{message.content}</span>
            <span className="date">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ))}
    </div>
  );
}
