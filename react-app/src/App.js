import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SideBar from "./components/Navigation/SideBar";
import { PostsLandingPage } from "./components/Post/LandingPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const onClick = (e) => {
    history.push('/')
  }

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <SideBar isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <PostsLandingPage />
          </Route>
          <Route>
            <img style={{ width: '100%', height: '100%', marginTop: 1 }}
              src="https://cdn.mos.cms.futurecdn.net/PuXipAW3AXUzUJ4uYyxPKC-1200-80.jpg" alt="404"
              onClick={onClick}
            />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
