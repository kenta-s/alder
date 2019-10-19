import axios from 'axios'
import { flashMessage } from 'redux-flash'
import { 
  MESSAGES_RECEIVE_MESSAGES,
  MESSAGES_RECEIVE_MESSAGE,
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

const receiveMessage = payload => ({
  type: MESSAGES_RECEIVE_MESSAGE,
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

export function postMessage(content, userId) {
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
    return instance.post(`/api/v1/messages`, {message: {user_id: userId, content}})
      .then(response => {
        dispatch(receiveMessage(response.data))
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
