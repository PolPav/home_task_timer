import { combineReducers } from 'redux';
import tasksStore from './tasks';
import infoTask from './infoTask';
import deleteTask from './deleteTask'

export const allReducers = combineReducers({
    tasks: tasksStore,
    currentTask: infoTask,
    deleteTask: deleteTask
});
