import { legacy_createStore as createStore } from 'redux'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  profilePhoto: null,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    case 'UPDATE_PROFILE_PHOTO':
      return { ...state, profilePhoto: action.payload }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
