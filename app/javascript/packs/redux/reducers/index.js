import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import { reducer as flashReducer } from 'redux-flash'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import tasks from './tasks'
import taskApplications from './taskApplications'
import csrftoken from './csrftoken'

export default (history) => combineReducers({ 
  reduxTokenAuth: reduxTokenAuthReducer,
  router: connectRouter(history),
  flash: flashReducer,
  tasks,
  taskApplications,
  csrftoken,
});
