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
 return localStorage
}

export function fetchTasks() {
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
