import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { allReducers } from './reducers';
import { HashRouter, Switch, Route } from 'react-router-dom';
import TaskInfo from "./containers/TaskInfo";

const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
      <HashRouter>
        <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/info" component={TaskInfo}/>
        </Switch>
      </HashRouter>
    </Provider>
, document.getElementById('root'));registerServiceWorker();
