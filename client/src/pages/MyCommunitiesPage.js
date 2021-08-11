import CommunityList from "../domain/Community/CommunityList.js";

export default function MyCommunitiesPage() {
  console.log("MY COMMUNITIES PAGE");
  return (
    <div className="App__Page App__ResourcesPage">
      <h1 className="App__Page__Head">MyCommunities</h1>
      <CommunityList />
    </div>
  );
}
