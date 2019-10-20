import { 
  SET_CSRFTOKEN,
  LOADING_START,
  LOADING_FINISH,
} from '../actionTypes'
import { flashMessage } from 'redux-flash'
import { history } from "../../redux/store";

export const ERROR_MESSAGE = "サーバーエラーが発生しました"

export const startLoading = () => ({
  type: LOADING_START
})

export const finishLoading = () => ({
  type: LOADING_FINISH
})

export const setCsrftoken = (token) => ({
  type: SET_CSRFTOKEN,
  token,
})

export function getCsrftoken() {
  return dispatch => {
    const token = document.getElementById('authenticity_token').getAttribute('value');
    dispatch(setCsrftoken(token))
  }
}

export const authenticateUser = currentUser => {
  return dispatch => {
    if(!currentUser.isLoading && !currentUser.isSignedIn){
      history.push('/signin')
      dispatch(flashMessage('ログインしてください', {isError: true}))
      return false
    }
    return true
  }
}

export const redirectUnlessGuest = currentUser => {
  return dispatch => {
    if(!currentUser.isLoading && currentUser.isSignedIn){
      history.push('/tasks')
      return false
    }
    return true
  }
}

// export const instance = axios.create({
//   headers: {
//     "access-token": window.localStorage['access-token'],
//     "token-type":   "Bearer",
//     "client":       window.localStorage['client'],
//     "expiry":       window.localStorage['expiry'],
//     "uid":          window.localStorage['uid']
//   }
// })
