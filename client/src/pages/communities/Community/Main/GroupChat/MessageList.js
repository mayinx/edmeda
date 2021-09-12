import "./MessageList.css";
import UserAvatar from "../../../../../domain/User/UserAvatar";
import useNotify from "../../../../../components/notifications/useNotify";

export default function MessageList({ messages }) {
  const { notifyInfo } = useNotify();
  function renderChatMessages() {
    if (Array.isArray(messages) && messages.length) {
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
