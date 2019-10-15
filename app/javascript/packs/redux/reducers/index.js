import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { reducer as flashReducer } from 'redux-flash'
import tasks from './tasks'
import taskApplications from './taskApplications'

export default (history) => combineReducers({ 
  router: connectRouter(history),
  flash: flashReducer,
  tasks,
  taskApplications,
});
