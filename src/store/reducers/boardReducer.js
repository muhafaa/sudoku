const initialState = {
  boards: [],
  isSolved: false,
  isLoading: false
}

function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SAVE_BOARDS':
      return { ...state, boards: action.payload.boards }

    case 'SOLVE_BOARD':
      return { ...state, isSolved: action.payload.isSolved }

    case 'CHANGE_BOARD':
      const { value, x, y } = action.payload
      const setBoards = (boards) => {
        let boardsTemp = [...boards]
        boardsTemp[x][y] = Number(value)
        return boardsTemp
      }
      return { ...state, boards: setBoards(state.boards) }

    case 'PLAY_AGAIN':
      return { ...state, isSolved: false }

    case 'START_LOADING':
      return { ...state, isLoading: true }

    case 'FINISH_LOADING':
      return { ...state, isLoading: false }

    default:
      return state
  }
}

export default boardReducer
