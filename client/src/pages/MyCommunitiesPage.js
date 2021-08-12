import axios from "axios";
import { useState, useEffect } from "react";
import CommunityList from "../domain/Community/CommunityList.js";

export default function MyCommunitiesPage() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    console.log("yohooo effect");
    axios
      .get("/api/communities")
      .then((res) => {
        setResources(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App__Page App__ResourcesPage">
      <h1 className="App__Page__Head">MyCommunities</h1>
      <CommunityList resources={resources} />
    </div>
  );
}
