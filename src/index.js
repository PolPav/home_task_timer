import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { allReducers } from './reducers';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import TaskInfo from "./components/TaskInfo";

const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/info" component={TaskInfo}/>
        </Switch>
      </BrowserRouter>
    </Provider>
, document.getElementById('root'));registerServiceWorker();
