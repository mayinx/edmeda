import "./CommunityList.css";
import { useEffect, useState } from "react";
import Community from "./Community.js";
import axios from "axios";

export default function CommunityList() {
  console.log("COMMUNITIES LIST!");
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

  function renderResources() {
    if (Array.isArray(resources) && resources.length) {
      return resources.map((community) => {
        return <Community community={community} as="ListItem" />;
      });
    } else {
      return (
        <div className="CollectionEmpty">
          <h2>Ups - looks like you didn't create any ommunities yet!</h2>
          <button
            // onClick={loadSampleCommunities}
            className="btn rounded green loadSampleCommunitiesButton"
          >
            Create my first community!
          </button>
        </div>
      );
    }
  }

  // TODO: Extract ResourcesFilterBar-Component
  return (
    <section className="ResourcesList CommunityList">
      <div className="ResourcesList__Items CommunityList__Items">
        {renderResources()}
      </div>
    </section>
  );
}
