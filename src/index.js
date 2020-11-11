import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import BinMap from './views/BinMap';
import SignUp from './views/Signup';
import Signin from './views/Signin';
import App from './App';
import Navbars from './views/Navbars';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Route path="/" component={ Navbars }></Route>
        <Route exact path="/" component={ App }></Route>
        <Route path="/signup" component={SignUp}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/map" component={ BinMap }></Route>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
