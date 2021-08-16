import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Community from "../../domain/Community/Community.js";
import axios from "axios";

export default function CommunityPage() {
  const params = useParams();
  const [resource, setResource] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // console.log("CommunityPage");
  // console.log("params", params);

  useEffect(() => {
    // const url = `https://rickandmortyapi.com/api/character/${params.id}`;

    axios
      .get(`/api/communities/${params.id}`)
      .then((res) => {
        console.log("data", res.data);
        setResource(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <div className="App__Page App__ResourcePage">
      {isLoading || !resource ? (
        <div className="mt-2 fs-1_5">Holy cow! Can't load that community!</div>
      ) : (
        <Community community={resource} />
      )}
    </div>
  );
}
