import "./Community.css";
// import CommunityFallbackProfilePic from "../../assets/happy-students.jpg";

export default function Community({ community, as }) {
  return (
    <section
      className={`Resource Community Community--${community.type} `}
      key={community.id}
      id={community.id}
    ></section>
  );
}
