import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import BinMap from "./views/BinMap";
import App from './App';

import history from './history';

export default (
    <Router history={history} path="/" component={App}>
        <Switch>
            <Route path="/" exact component={App} />
            <Route path="/views/binmap" component={BinMap} />
        </Switch>
    </Router>
);

