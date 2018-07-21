import React from 'react';
import ReactDOM from 'react-dom';

import App from './container/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider, createStore } from 'react-redux';
import store, { history } from './store/store';
import './assets/custom.css';
// import $ from "jquery"
import "./assets/css/bootstrap-clearmin.min.css"
import "./assets/css/roboto.css"
import "./assets/css/material-design.css"
import "./assets/css/small-n-flat.css"
import "./assets/css/font-awesome.min.css"








ReactDOM.render(

    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById('root'));
registerServiceWorker();
