import { 
  MESSAGES_RECEIVE_MESSAGES,
  MESSAGES_RECEIVE_MESSAGE,
} from "../actionTypes";

const initialState = {
  data: [],
} 

const messageCounts = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGES_RECEIVE_MESSAGES: {
      const data = action.payload.map(message => {
        return {
          id: message.id,
          content: message.content,
          sentAt: message.created_at,
        }
      })
      return {
        data
      };
    }
    case MESSAGES_RECEIVE_MESSAGE: {
      const data = [...state.data, {id: action.payload.id, content: action.payload.content, sentAt: action.payload.created_at}]
      return {
        data
      };
    }
    default:
      return state;
  }
}

export default messageCounts;
