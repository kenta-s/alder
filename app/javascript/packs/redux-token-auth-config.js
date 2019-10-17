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
    firstName: 'first_name',
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
