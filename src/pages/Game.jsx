import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-native-paper'
import { Text, View, Alert, ToastAndroid } from 'react-native'
import { Card } from 'react-native-paper'

// styles
import styles from '../../styles'

// components
import Board from '../components/Board'
import Timer from '../components/Timer'
import Loading from '../components/Loading'

// actions
import {
  saveBoard,
  validateBoard,
  autoSolve,
  changeBoard
} from '../store/actions/boardAction'

const Game = (props) => {
  const dispatch = useDispatch()

  const isLoading = useSelector((state) => state.boardReducer.isLoading)
  const boards = useSelector((state) => state.boardReducer.boards)
  const isSolved = useSelector((state) => state.boardReducer.isSolved)

  const username = useSelector((state) => state.userReducer.username)
  const level = useSelector((state) => state.userReducer.level)

  const [isStarted, setIsStarted] = useState(false)
  const [loadingSolve, setloadingSolve] = useState(false)
  const [loadingSubmit, setloadingSubmit] = useState(false)
  const [stopTimer, setStopTimer] = useState(false)

  useEffect(() => {
    console.log('Game')
    getBoard()
  }, [])

  useEffect(() => {
    if (isSolved) {
      endGame()
    }
  }, [isSolved])

  useEffect(() => {
    setloadingSolve(false)
  }, [boards])

  useEffect(() => {
    if (loadingSolve) {
      setStopTimer(true)
    }
  }, [loadingSolve])

  const startGame = () => {
    setIsStarted(true)
  }

  const endGame = () => {
    if (!stopTimer || isSolved) {
      props.navigation.push('Finish')
    }
  }

  const getBoard = () => {
    dispatch(saveBoard())
  }

  const newBoard = () => {
    Alert.alert(
      'Start a new game',
      'Are you sure want to start a new game?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            setIsStarted(false)
            props.navigation.navigate('Home')
          }
        }
      ],
      { cancelable: false }
    )
  }

  const setBoard = (value, x, y) => {
    dispatch(changeBoard(value, x, y))
  }

  const validate = () => {
    setloadingSubmit(true)
    dispatch(validateBoard())
      .then(() => {
        setloadingSubmit(false)
        ToastAndroid.showWithGravityAndOffset(
          'Wrong Answer',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const solve = () => {
    const solving = () => {
      setloadingSolve(true)
      setStopTimer(true)
      dispatch(autoSolve())
      console.log(stopTimer)
    }

    Alert.alert(
      'Show The Answer?',
      'It means you give up the game',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => solving()
        }
      ],
      { cancelable: false }
    )
  }

  return (
    <>
      {(() => {
        if (isLoading) {
          return <Loading />
        } else {
          return (
            <View style={[styles.flex]}>
              <Text
                style={[
                  styles.xlarge,
                  styles.fontBold,
                  styles.textCenter,
                  styles.mt5
                ]}
              >
                Sudoku
              </Text>

              <View
                style={[
                  styles.flex,
                  styles.flexRow,
                  styles.justifyCenter,
                  styles.mt5
                ]}
              >
                <View
                  style={[
                    styles.flex,
                    styles.flexRow,
                    styles.justifyBetween,
                    styles.w80
                  ]}
                >
                  <Card
                    style={{
                      flex: 1
                    }}
                  >
                    <Text
                      style={[
                        styles.textCenter,
                        styles.tengahin,
                        styles.medium
                      ]}
                    >
                      {username}
                    </Text>
                  </Card>

                  <Card
                    style={{
                      flex: 1
                    }}
                  >
                    <Text
                      style={[
                        styles.textCenter,
                        styles.tengahin,
                        styles.medium
                      ]}
                    >
                      {level.toUpperCase()}
                    </Text>
                  </Card>
                </View>
              </View>

              <Timer
                isStarted={isStarted}
                startGame={startGame}
                endGame={endGame}
                stopTimer={stopTimer}
              />

              {(() => {
                if (isStarted) {
                  return (
                    <>
                      <View>
                        <Board boards={boards} changeBoard={setBoard} />
                      </View>
                      <View style={[styles.container, styles.mt5]}>
                        <View style={styles.mb5}>
                          <Button
                            mode="contained"
                            color="indigo"
                            loading={loadingSubmit ? true : false}
                            onPress={() => validate()}
                            disabled={stopTimer ? true : false}
                          >
                            {!loadingSubmit ? 'SUBMIT' : 'Loading'}
                          </Button>
                        </View>
                        <View
                          style={[
                            styles.flex,
                            styles.flexRow,
                            styles.justifyEvenly
                          ]}
                        >
                          <Button
                            mode="contained"
                            color="orange"
                            loading={loadingSolve ? true : false}
                            disabled={stopTimer ? true : false}
                            onPress={() => solve()}
                          >
                            {!loadingSolve ? 'SHOW ANSWER' : 'Loading'}
                          </Button>
                          <Button
                            mode="contained"
                            color="gray"
                            dark={true}
                            onPress={() => {
                              newBoard()
                            }}
                          >
                            NEW BOARD
                          </Button>
                        </View>
                      </View>
                    </>
                  )
                }
              })()}
            </View>
          )
        }
      })()}
    </>
  )
}

export default Game
