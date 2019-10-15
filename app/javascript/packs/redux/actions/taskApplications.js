import axios from 'axios'
import { flashMessage } from 'redux-flash'
import { 
  TASK_APPLICATIONS_RECEIVE_TASK_APPLICATIONS,
  TASK_APPLICATIONS_ADD_TASK_APPLICATION,
} from '../actionTypes'
import {
  ERROR_MESSAGE,
  startLoading,
  finishLoading,
} from './common'

const receiveData = payload => ({
  type: TASK_APPLICATIONS_RECEIVE_TASK_APPLICATIONS,
  payload,
})

const addTaskApplication = payload => ({
  type: TASK_APPLICATIONS_ADD_TASK_APPLICATION,
  payload,
})

export function fetchTaskApplications() {
  return dispatch => {
    dispatch(startLoading())
    return axios(`/api/v1/task_applications`)
      .then(response => {
        dispatch(receiveData(response.data))
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

export function createTaskApplication(csrftoken, taskId) {
  axios.defaults.headers.common['X-CSRF-Token'] = csrftoken
  return dispatch => {
    dispatch(startLoading())
    return axios.post(`/api/v1/task_applications/`, {
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
