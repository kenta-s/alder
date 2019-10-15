import { 
  SET_CSRFTOKEN,
} from "../actionTypes";

const initialState = {
  token: ''
} 

const csrftoken = (state = initialState, action) => {
  switch (action.type) {
    case SET_CSRFTOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }
    default:
      return state;
  }
}

export default csrftoken;
