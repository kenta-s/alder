import axios from 'axios'
import { flashMessage } from 'redux-flash'
import { 
  TASK_APPLICATIONS_RECEIVE_TASK_APPLICATIONS,
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
