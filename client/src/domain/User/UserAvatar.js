import UserFallbackProfilePic from "../../assets/user/fb_avatars/fbAvatar.png";
import "./UserAvatar.css";

export default function UserAvatar(props) {
  const {
    user,
    avatarWrapperClassName,
    className,
    title = `${user.userName} (${user.type})`,
    alt = `{user.userName}'s avatar (user profile picture) on Edmeda`,
    wrapper = true,
  } = props;

  let avatarUrl = user?.picture;
  if (!avatarUrl) {
    try {
      avatarUrl = user?.fbAvatarFileName
        ? require(`../../assets/user/fb_avatars/${user?.fbAvatarFileName}.png`)
            .default
        : UserFallbackProfilePic;
    } catch (e) {
      avatarUrl = UserFallbackProfilePic;
    }
  }

  return (
    <>
      {wrapper ? (
        <p
          className={`User__ProfilePic-wrapper ${
            avatarWrapperClassName ?? null
          }`}
          title={title}
        >
          <img
            src={`${avatarUrl}`}
            className={`User__ProfilePic ${className ?? null}`}
            alt={alt}
          />
        </p>
      ) : (
        <img
          src={`${avatarUrl}`}
          className={`User__ProfilePic ${className ?? null}`}
          alt={alt}
          title={title}
        />
      )}
    </>
  );
}
