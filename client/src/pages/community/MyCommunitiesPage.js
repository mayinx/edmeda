import CommunityList from "../../domain/Community/CommunityList.js";
import { useContext } from "react";
import CommunitiesContext from "../../contexts/CommunitiesContext";

export default function MyCommunitiesPage() {
  const { communities } = useContext(CommunitiesContext);
  return (
    <div className="App__Page App__ResourcesPage">
      <h1 className="App__Page__Head">MyCommunities</h1>
      <CommunityList resources={communities} />
    </div>
  );
}
