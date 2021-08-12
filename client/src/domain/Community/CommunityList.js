import "./CommunityList.css";
import { useEffect, useState } from "react";
import Community from "./Community.js";
import axios from "axios";

import { Link } from "react-router-dom";

export default function CommunityList({ resources }) {
  console.log("COMMUNITIES LIST!");
  // const [resources, setResources] = useState([]);

  // useEffect(() => {
  //   console.log("yohooo effect");
  //   axios
  //     .get("/api/communities")
  //     .then((res) => {
  //       setResources(res.data || []);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function renderResources() {
    if (Array.isArray(resources) && resources.length) {
      return resources.map((community) => {
        return (
          <Community community={community} as="ListItem" key={community._id} />
        );
      });
    } else {
      return (
        <div className="CollectionEmpty">
          <h2>Ups - looks like you didn't create any communities yet!</h2>

          <Link to="newCommunity">
            <button className="btn rounded green">
              Create your first community!
            </button>
          </Link>
        </div>
      );
    }
  }

  return (
    <section className="ResourcesList CommunityList">
      <div className="ResourcesList__Items CommunityList__Items">
        {renderResources()}
      </div>
    </section>
  );
}
