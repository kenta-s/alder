import { 
  MESSAGE_INBOX_RECEIVE_MESSAGE,
} from "../actionTypes";

const initialState = {
  data: [],
} 

const messageInbox = (state = initialState, action) => {
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

export default messageInbox;
