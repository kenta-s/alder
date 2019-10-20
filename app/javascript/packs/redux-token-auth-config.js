import { generateAuthActions } from 'redux-token-auth'
// import { authUrl } from './constants'

const config = {
  // authUrl,
  authUrl: '/auth',
  userAttributes: {
    name: 'name',
    nickname: 'nickname',
    status: status,
  },
  userRegistrationAttributes: {
    name: 'name',
    email: 'email',
    password: 'password',
    passwordConfirmation: 'password_confirmation',
    status: 'status',
  },
}

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
