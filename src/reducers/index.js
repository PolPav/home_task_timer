import { combineReducers } from 'redux';
import taskStore from './tasks';

export const allReducers = combineReducers({
    tasks: taskStore
});
