import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
// import SignupFormPage from "./components/SignupFormPage";
// import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import SideBar from "./components/Navigation/SideBar";
import { LandingPage } from "./components/LandingPage/LandingPage";
import { UserDetail } from "./components/User";
import { ProfilePage } from "./components/User/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.session.user)

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
          {/* <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route> */}
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/users/current">
            <ProfilePage user={user} />
          </Route>
          <Route exact path="/users/:userId">
            <UserDetail />
          </Route>
          <Route>
            <img style={{ width: '80%', height: '100%', marginLeft: "25%", cursor: "pointer" }}
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
