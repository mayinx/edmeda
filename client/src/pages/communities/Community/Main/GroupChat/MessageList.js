import "./MessageList.css";
import UserAvatar from "../../../../../domain/User/UserAvatar";
import useNotify from "../../../../../components/notifications/useNotify";

export default function MessageList({ messages }) {
  const { notifyInfo } = useNotify();
  function renderChatMessages() {
    if (Array.isArray(messages) && messages.length) {
      const renderedMessages = messages.map((message) => {
        const date = new Date(message.createdAt);
        return (
          <div key={message._id} className="Message">
            <div className="user">
              <UserAvatar user={message.creator} avatarClassName="ChatAvatar" />

              <span
                className={`Sender__Type tag smaller bold ${global.config.user.typeTagColorFor(
                  message?.creator?.type
                )}`}
              >
                {message?.creator?.type}
              </span>
            </div>
            {/* <div className="content">{message.content}</div> */}
            <div className="content">
              <div className="Message__header">
                <span>
                  <span className="Message__sender--name">
                    {message.creator.userName}
                  </span>{" "}
                  <span className="Message__sent--ago">vor 10 Minuten</span>
                </span>
                <span className="Message__sent--date">
                  {" "}
                  {new Intl.DateTimeFormat("de-DE").format(date)} |{" "}
                  {new Intl.DateTimeFormat("de-DE", {
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                  }).format(date)}{" "}
                  Uhr
                </span>
              </div>
              <div className="Message__body">{message.content}</div>
            </div>
          </div>
        );
      });
      return renderedMessages;
    } else {
      notifyInfo({
        title: "Tumbleweeds blow across the desert...",
        message: "...a bit quiet in here: Start chatting!",
        toastCntId: "appNotificationCnt",
      });
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
