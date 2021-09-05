import "./MessageList.css";
// import Avatar, { genConfig } from "react-nice-avatar";

// import CollectionEmptyPic from "../../../../../assets/tumbleweed-rolls-in-the-desert.jpg";
import UserAvatar from "../../../../../domain/User/UserAvatar";
import useNotify from "../../../../../components/notifications/useNotify";
// import CollectionEmptyPic from "../../../../../assets/tumbleweed-and-cactus.jpg";

export default function MessageList({ messages }) {
  const { notifyInfo } = useNotify();
  function renderChatMessages() {
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
            <div className="user">
              <UserAvatar user={message.creator} avatarClassName="ChatAvatar" />
              {/* <span className="user">{message.user.name}:</span> */}
              <span className="date">
                {new Date(message.createdAt).toLocaleTimeString()}
              </span>
            </div>
            <span className="content">{message.content}</span>
          </div>
        );
      });
      return renderedMessages;
    } else {
      {
        notifyInfo({
          title: "Tumbleweeds blow across the desert...",
          message: "...a bit quiet in here: Start chatting!",
          toastCntId: "appNotificationCnt",
        });
      }
    }
  }

  return (
    <div
      className={`MessageList ${
        !(Array.isArray(messages) && messages.length)
          ? "MessageList--empty"
          : null
      }`}
    >
      {renderChatMessages()}
    </div>
  );
}
