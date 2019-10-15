import { 
  TASK_APPLICATIONS_RECEIVE_TASK_APPLICATIONS,
  TASK_APPLICATIONS_ADD_TASK_APPLICATION,
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
    case TASK_APPLICATIONS_ADD_TASK_APPLICATION: {
      const data = [...state.data, action.payload]
      return {
        data
      };
    }
    default:
      return state;
  }
}

export default taskApplications;
