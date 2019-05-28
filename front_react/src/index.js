import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./Container/Register/register";
import Login from "./Container/Login/login";
import Logout from "./Container/Logout/logout";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import store from "./redux/store";
import Home from "./Container/Home/Home";
import Result from "./Components/Result";
import Scan from "./Components/Scan";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStroopwafel,
  faCoffee,
  faCamera,
  faBarcode
} from "@fortawesome/free-solid-svg-icons";
library.add(faCamera, faCoffee, faBarcode, faStroopwafel);
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/scan" component={Scan} />
        <Route exact path="/result/:id" component={Result} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.unregister();
