import * as a from './actions'

const initialState = {
  isSignIn: false,
  signIn: null,
  step: null,
  selectedWallet: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case a.LOGIN_SIGN_IN:
      return {
        ...state,
        isSignIn: true,
      }
    case a.LOGIN_SIGN_OUT:
      return {
        ...state,
        isSignIn: false,
        signIn: null,
      }
    case a.LOGIN_SET_SIGN_IN_MODEL:
      return {
        ...state,
        isSignIn: false,
        signIn: action.signInModel,
      }
    case a.LOGIN_CHANGE_STEP:
      return {
        ...state,
        step: action.step,
      }
    case a.LOGIN_SELECT_WALLET:
      return {
        ...state,
        selectedWallet: action.wallet,
      }
    default:
      return state
  }
}
