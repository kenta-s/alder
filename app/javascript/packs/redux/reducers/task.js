import { 
  TASK_RECEIVE_TASK,
  TASK_ADD_TASK_APPLICATION,
} from "../actionTypes";

const initialState = {
  id: null,
  title: '',
  description: '',
  status: '',
  expiresAt: '',
  taskApplications: [],
} 

const task = (state = initialState, action) => {
  switch (action.type) {
    case TASK_RECEIVE_TASK: {
      const {id, title, description, status} = action.payload
      const expiresAt = action.payload.end_at
      const taskApplications = action.payload.task_applications
      return {
        id,
        title,
        description,
        status,
        expiresAt,
        taskApplications,
      };
    }
    case TASK_ADD_TASK_APPLICATION: {
      const taskApplications = [...state.taskApplications, action.payload]
      return {
        ...state,
        taskApplications,
      };
    }
    default:
      return state;
  }
}

export default task;
