import axios from 'axios'
import { flashMessage } from 'redux-flash'
import { 
  TASKS_RECEIVE_TASKS,
} from '../actionTypes'
import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveTasks = tasks => ({
  type: TASKS_RECEIVE_TASKS,
  tasks,
})

const getStorage = () => {
 return window.localStorage
}

export function fetchTasks() {
  const instance = axios.create({
    headers: {
      "access-token": getStorage()['access-token'],
      "token-type":   "Bearer",
      "client":       getStorage()['client'],
      "expiry":       getStorage()['expiry'],
      "uid":          getStorage()['uid']
    }
  })
  
  return dispatch => {
    dispatch(startLoading())
    // return axios(`/api/v1/tasks`)
    return instance.get(`/api/v1/tasks`)
      .then(response => {
        dispatch(receiveTasks(response.data))
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
