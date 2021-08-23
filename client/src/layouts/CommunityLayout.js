import { Route, Switch } from "react-router-dom";
import AppHeader from "../components/app/AppHeader";
import CommunityContext from "../contexts/CommunityContext";
import CommunityPage from "../pages/communities/CommunityPage";
import "./CommunityLayout.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CommunityLayout() {
  const [currentCommunity, setCurrentCommunity] = useState({});
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/communities/${params.id}`)
      .then((res) => {
        console.log("data", res.data);
        setCurrentCommunity(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.id]);

  return (
    <>
      <CommunityContext.Provider
        value={{ currentCommunity, setCurrentCommunity }}
      >
        <AppHeader className="CommunityHeader" />
        <main className="CommunityLayout">
          {isLoading || !currentCommunity ? (
            <div className="mt-2 fs-1_5">
              Holy cow! Can't load that community!
            </div>
          ) : (
            <Switch>
              <Route path="/communities/:id" component={CommunityPage} />
            </Switch>
          )}
        </main>
      </CommunityContext.Provider>
    </>
  );
}
