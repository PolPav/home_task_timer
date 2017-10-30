import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { allReducers } from './reducers';

const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
    registerServiceWorker();

// function getTasksStore(state = [], action) {
//     const key = "tasksStorage";
//
//     if(action.type === "ADD_TASK"){
//         const $array = [...state, action.payload];
//         const str = JSON.stringify($array);
//         localStorage.setItem(key, str);
//
//         return JSON.parse(localStorage.getItem(key));
//     }
//
//     return state;
// }

// function getTasks(state = [], action) {
//
//     if(action.type === "ADD_TASK"){
//         return [...state, action.payload];
//     }
//
//     return state;
// }
//
// const store = createStore(getTasks);
//
// store.subscribe(() => {
//     console.log('subscribe', store.getState());
// });
//
// store.dispatch({type: "ADD_TASK", payload: "new task"});
// store.dispatch({type: "ADD_TASK", payload: "new task 2"});
//
// ReactDOM.render(
//    <div>
//
//    </div>
// , document.getElementById('root'));
//     registerServiceWorker();