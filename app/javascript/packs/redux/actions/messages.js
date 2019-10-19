import axios from 'axios'
import { flashMessage } from 'redux-flash'
import { 
  MESSAGES_RECEIVE_MESSAGES,
} from '../actionTypes'
import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveMessages = payload => ({
  type: MESSAGES_RECEIVE_MESSAGES,
  payload,
})

const getStorage = () => {
 return localStorage
}

export function fetchMessages() {
  const instance = axios.create({
    headers: {
      "access-token": getStorage().getItem('access-token'),
      "token-type":   "Bearer",
      "client":       getStorage().getItem('client'),
      "expiry":       getStorage().getItem('expiry'),
      "uid":          getStorage().getItem('uid')
    }
  })

  return dispatch => {
    dispatch(startLoading())
    return instance.get(`/api/v1/messages`)
      .then(response => {
        dispatch(receiveMessages(response.data))
        return response
      })
      .catch(() => {
        return dispatch(flashMessage(ERROR_MESSAGE, {isError: true}))
      })
      .then(response => {
        dispatch(finishLoading())
        return response
      })
  }
}
