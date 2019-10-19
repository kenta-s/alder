import { 
  MESSAGE_COUNTS_RECEIVE_MESSAGE_COUNTS,
} from "../actionTypes";

const initialState = {
  data: [],
} 

const messageCounts = (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_COUNTS_RECEIVE_MESSAGE_COUNTS: {
      const data = action.payload.map(messageCount => {
        return {
          userId: messageCount.user_id,
          name: messageCount.user_name,
          unreadCount: messageCount.unread_count,
        }
      })
      return {
        data
      };
    }
    default:
      return state;
  }
}

export default messageCounts;
