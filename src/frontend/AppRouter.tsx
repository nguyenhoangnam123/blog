import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "unstated-x";
import Home from "Components/pages/Home";
import Login from "Components/pages/Login";
import Navbar from "Components/inc/Navbar";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Provider>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          exact
          render={(props: any) => <Login {...props} />}
        />
      </Provider>
    </Router>
  );
};

export default AppRouter;
