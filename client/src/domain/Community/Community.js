import "./Community.css";

export default function Community({ community, as }) {
  return (
    <section
      className={`Resource Community Community--${community.type} `}
      key={community.id}
      id={community.id}
    ></section>
  );
}
