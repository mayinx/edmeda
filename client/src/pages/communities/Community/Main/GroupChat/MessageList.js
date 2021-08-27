import "./MessageList.css";
import Avatar, { genConfig } from "react-nice-avatar";

import CollectionEmptyPic from "../../../../../assets/tumbleweed-rolls-in-the-desert.jpg";
// import CollectionEmptyPic from "../../../../../assets/tumbleweed-and-cactus.jpg";

export default function MessageList({ messages }) {
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

  function renderChatMessages() {
    console.log("messages in renderMessaes: ", messages);
    if (Array.isArray(messages) && messages.length) {
      // return resources.map((community) => {
      //   return <CommunityListItem community={community} key={community._id} />;
      // });
      const renderedMessages = messages.map((message) => {
        return (
          <div
            key={message._id}
            className="Message"
            title={`Sent at ${new Date(
              message.createdAt
            ).toLocaleTimeString()}`}
          >
            <span className="user">
              <UserAvatar />
              {/* <span className="user">{message.user.name}:</span> */}
            </span>
            <span className="content">{message.content}</span>
            <span className="date">
              {new Date(message.createdAt).toLocaleTimeString()}
            </span>
          </div>
        );
      });
      return renderedMessages;
    } else {
      return (
        <div className="CollectionEmpty">
          {/* <h3>
            Ups - a bit quite in here, isn't it? Italo-Western style... No
            worries - just start the chatter by creating your first message -
            others will follow!
          </h3> */}
          <div className="imgWrapper">
            <img
              src={CollectionEmptyPic}
              className="CollectionEmptyPic"
              alt=""
            ></img>
          </div>
        </div>
      );
    }
  }

  return <div className="MessageList">{renderChatMessages()}</div>;
}
