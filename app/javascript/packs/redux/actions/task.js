import axios from 'axios'
import { flashMessage } from 'redux-flash'
import { 
  TASK_RECEIVE_TASK,
  TASK_ADD_TASK_APPLICATION,
} from '../actionTypes'
import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveTask = payload => ({
  type: TASK_RECEIVE_TASK,
  payload,
})

const addTaskApplication = payload => ({
  type: TASK_ADD_TASK_APPLICATION,
  payload,
})

const getStorage = () => {
 return localStorage
}

export function fetchTask(taskId) {
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
    return instance.get(`/api/v1/tasks/${taskId}`)
      .then(response => {
        dispatch(receiveTask(response.data))
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

export function createTaskApplication(taskId) {
  const instance = axios.create({
    headers: {
      "access-token": getStorage()['access-token'],
      "token-type":   "Bearer",
      "client":       getStorage()['client'],
      "expiry":       getStorage()['expiry'],
      "uid":          getStorage()['uid']
    }
  })
  // axios.defaults.headers.common['X-CSRF-Token'] = csrftoken
  return dispatch => {
    dispatch(startLoading())
    return instance.post(`/api/v1/task_applications/`, {
      task_application: {
        task_id: taskId
      }
    })
    .then(response => {
      dispatch(addTaskApplication(response.data))
		  dispatch(flashMessage('応募しました。担当者からのご連絡をお待ちください。', false))
      return response
    })
    .catch(error => {
      return dispatch(flashMessage(ERROR_MESSAGE, {isError: true}))
    })
    .then(response => {
      dispatch(finishLoading())
      return response
    })
  }
}
