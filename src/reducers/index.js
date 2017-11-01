import { combineReducers } from 'redux';
import tasksStore from './tasks';
import infoTask from './infoTask';

export const allReducers = combineReducers({
    tasks: tasksStore,
    currentTask: infoTask
});
