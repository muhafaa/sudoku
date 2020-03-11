const initialState = {
  username: '',
  level: ''
}

function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        username: action.payload.username,
        level: action.payload.level
      }

    default:
      return state
  }
}

export default userReducer
