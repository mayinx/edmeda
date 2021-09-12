import UserFallbackProfilePic from "../../assets/user/fb_avatars/fbAvatar.png";
import "./UserAvatar.css";

export default function UserAvatar(props) {
  const {
    user,
    avatarWrapperClassName,
    avatarClassName,
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
        >
          <img
            src={`${avatarUrl}`}
            className={`User__ProfilePic ${avatarClassName ?? null}`}
            alt=""
          />
        </p>
      ) : (
        <img
          src={`${avatarUrl}`}
          className={`User__ProfilePic ${avatarClassName ?? null}`}
          alt=""
        />
      )}
    </>
  );
}
