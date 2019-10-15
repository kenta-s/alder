import { 
  TASK_APPLICATIONS_RECEIVE_TASK_APPLICATIONS,
} from "../actionTypes";

const initialState = {
  data: [],
} 

const taskApplications = (state = initialState, action) => {
  switch (action.type) {
    case TASK_APPLICATIONS_RECEIVE_TASK_APPLICATIONS: {
      return {
        data: action.payload,
      };
    }
    default:
      return state;
  }
}

export default taskApplications;
