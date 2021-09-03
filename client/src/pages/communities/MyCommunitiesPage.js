import CommunityList from "../../domain/Community/CommunityList.js";
import { useContext } from "react";
import CommunitiesContext from "../../contexts/CommunitiesContext";

export default function MyCommunitiesPage() {
  const { communities } = useContext(CommunitiesContext);
  return (
    <div className="App__Page App__ResourcesPage">
      <CommunityList resources={communities} />
    </div>
  );
}
