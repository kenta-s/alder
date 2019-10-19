import { 
  MESSAGES_RECEIVE_MESSAGES,
} from "../actionTypes";

const initialState = {
  data: [],
} 

const messages = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_RECEIVE_MESSAGES: {
      return {
        data: action.payload,
      };
    }
    default:
      return state;
  }
}

export default messages;
