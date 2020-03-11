import axios from 'axios'
export const saveBoard = () => {
  return (dispatch, getState) => {
    const level = getState().userReducer.level
    dispatch({
      type: 'START_LOADING'
    })
    axios({
      method: 'GET',
      url: 'https://sugoku.herokuapp.com/board?difficulty=' + level
    })
      .then(({ data }) => {
        return dispatch({
          type: 'SAVE_BOARDS',
          payload: {
            boards: data.board
          }
        })
      })
      .then(() => {
        dispatch({
          type: 'FINISH_LOADING'
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const changeBoard = (value, x, y) => {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      resolve(
        dispatch({
          type: 'START_LOADING'
        })
      )
    })
      .then(() => {
        return dispatch({
          type: 'CHANGE_BOARD',
          payload: {
            value,
            x,
            y
          }
        })
      })
      .then(() => {
        dispatch({
          type: 'FINISH_LOADING'
        })
      })
      .catch((err) => {
        dispatch({
          type: 'FINISH_LOADING'
        })
        console.log(err)
      })
  }
}

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? '' : '%2C'}`,
    ''
  )

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
    .join('&')

export const validateBoard = () => {
  return (dispatch, getState) => {
    const { boards } = getState().boardReducer
    const data = { board: boards }
    return axios({
      method: 'POST',
      url: 'https://sugoku.herokuapp.com/validate',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: encodeParams(data)
    })
      .then(({ data }) => {
        if (data.status === 'solved') {
          dispatch({
            type: 'SOLVE_BOARD',
            payload: {
              isSolved: true
            }
          })
        } else {
          dispatch({
            type: 'SOLVE_BOARD',
            payload: {
              isSolved: false
            }
          })
        }
      })
      .catch((err) => {
        console.log(err)
        dispatch({
          type: 'SOLVE_BOARD',
          payload: {
            isSolved: false
          }
        })
      })
  }
}

export const autoSolve = () => {
  return (dispatch, getState) => {
    const { boards } = getState().boardReducer
    const data = { board: boards }
    axios({
      method: 'POST',
      url: 'https://sugoku.herokuapp.com/solve',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: encodeParams(data)
    })
      .then(({ data }) => {
        dispatch({
          type: 'SAVE_BOARDS',
          payload: {
            boards: data.solution
          }
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const playAgain = () => {
  return {
    type: 'PLAY_AGAIN'
  }
}
