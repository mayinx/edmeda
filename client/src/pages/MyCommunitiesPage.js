import CommunityList from "../domain/Community/CommunityList.js";
import { useContext } from "react";
import CommunitiesContext from "../contexts/CommunitiesContext";

export default function MyCommunitiesPage() {
  const { resources, setResources } = useContext(CommunitiesContext);
  return (
    <div className="App__Page App__ResourcesPage">
      <h1 className="App__Page__Head">MyCommunities</h1>
      <CommunityList resources={resources} />
    </div>
  );
}
