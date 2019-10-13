import { 
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
