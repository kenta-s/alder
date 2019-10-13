import { 
  TASKS_RECEIVE_TASKS,
} from "../actionTypes";

const initialState = {
  data: [],
} 

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case TASKS_RECEIVE_TASKS: {
      return {
        data: action.tasks,
      };
    }
    default:
      return state;
  }
}

export default tasks;
