import SchoolCommunityFbProfilePic from "../../../../assets/community/fb_profile_pics/shutterstock_1856929843_mod.jpg";
import "./Profile.css";
import { FaUserAlt } from "react-icons/fa";
import { FaDotCircle } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";

export default function Profile({ community }) {
  let profilePicUrl = community?.picture;
  if (!profilePicUrl) {
    try {
      profilePicUrl = community?.fbProfilePicFileName
        ? require(`../../../../assets/community/fb_profile_pics/${community?.fbProfilePicFileName}.jpg`)
            .default
        : SchoolCommunityFbProfilePic;
    } catch (e) {
      profilePicUrl = SchoolCommunityFbProfilePic;
    }
  }

  return (
    <section
      className={`CommunityProfile CommunityProfile--${community.type} `}
      key={community.id}
      id={community.id}
    >
      <p className="CommunityProfile__Image--wrapper">
        <img src={profilePicUrl} className="CommunityProfile__Image" alt="" />
      </p>

      <h3 className="CommunityProfile__CommunityName truncate ">
        {community.name}
      </h3>

      <ul className="CommunityProfile__CommunityMeta">
        <li>
          <span>
            <FaUserAlt className="CommunityMeta__Icon" />
          </span>
          <div className="">
            <span className="CommunityMeta__Caption">Creator: </span>
            <span className="truncate">{community?.creator?.fullName}</span>
          </div>
        </li>
        <li>
          <FaUsers className="CommunityMeta__Icon" />
          <div className="d-flex">
            <span className="CommunityMeta__Caption">Members: </span>32 |
          </div>{" "}
          <FaDotCircle className="OnlineIcon" />
          <div className="d-flex">
            <span className="CommunityMeta__Caption">Online: </span>15
          </div>
        </li>
        <li>
          <FaUserAlt className="CommunityMeta__Icon" />
          <div className="d-flex">
            <span className="CommunityMeta__Caption">Students: </span>28 |{" "}
            <span className="CommunityMeta__Caption">Online: </span>13
          </div>
        </li>
        <li>
          <FaUserAlt className="CommunityMeta__Icon" />
          <div className="d-flex">
            <span className="CommunityMeta__Caption">Students: </span>28 |{" "}
            <span className="CommunityMeta__Caption">Online: </span>13
          </div>
        </li>
      </ul>
    </section>
  );
}
