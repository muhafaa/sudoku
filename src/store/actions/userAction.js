export const startGame = (username, level) => {
  return {
    type: 'START_GAME',
    payload: {
      username,
      level
    }
  }
}
