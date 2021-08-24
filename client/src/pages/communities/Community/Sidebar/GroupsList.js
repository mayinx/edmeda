import { FaCaretRight } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import "./GroupsList.css";

export default function GroupsList(props) {
  const renderGroupsListItems = () => {
    let renderedItems = props.community.groups.map((group) => {
      console.log("group ", group);
      const itemClass =
        props.currentGroup._id === group._id
          ? "CommunityGroupsList__Item CommunityGroupsList__Item--current"
          : "CommunityGroupsList__Item";
      return (
        <li
          className={itemClass}
          key={group._id}
          onClick={(e) => props.onGroupChange(e, group._id)}
        >
          <span className="groupName">{group.name}</span>
          <span className="openGroupIconWrap">
            <FaCaretRight />
          </span>
        </li>
      );
    });

    return renderedItems;
  };

  return (
    <ol className={`CommunityGroupsList ${props.addClass}`}>
      <li className="CommunityGroupsList--Header">
        <span className="headerGroupIconWrap">
          <FaUsers className="headerGroupIcon" />
        </span>
        <span className="groupTypeName">{props.head}</span>
      </li>
      {renderGroupsListItems()}
    </ol>
  );
}
