import { 
  SET_CSRFTOKEN,
  LOADING_START,
  LOADING_FINISH,
} from '../actionTypes'

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
