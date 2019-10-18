import { generateAuthActions } from 'redux-token-auth'
// import { authUrl } from './constants'

const config = {
  // authUrl,
  authUrl: '/auth',
  userAttributes: {
    name: 'name',
    nickname: 'nickname',
  },
  userRegistrationAttributes: {
    email: 'email',
    password: 'password',
    passwordConfirmation: 'password_confirmation',
    userStatus: 'status',
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
