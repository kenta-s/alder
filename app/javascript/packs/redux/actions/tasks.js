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

export function fetchTasks() {
  return dispatch => {
    dispatch(startLoading())
    return axios(`/api/v1/tasks`)
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
