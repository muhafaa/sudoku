import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { View, Text } from 'react-native'
import styles from '../../styles'

const Timer = (props) => {
  const [timer, setTimer] = useState('')
  const [loading, setLoading] = useState(false)
  let interval

  useEffect(() => {
    console.log('Timer')
  }, [])

  useEffect(() => {
    if (!props.isStarted) {
      clearInterval(interval)
      setLoading(false)
    }
  }, [props.isStarted])

  useEffect(() => {
    if (props.stopTimer) {
      console.log('stop timer')
      clearInterval(interval)
    }
  }, [props.stopTimer])

  const countDown = (seconds) => {
    interval = setInterval(() => {
      const min = Math.floor(seconds / 60)
      const sec = seconds % 60
      const time = `${String(min).padStart(2, 0)} : ${String(sec).padStart(
        2,
        0
      )}`
      seconds--
      if (seconds < 0) {
        const { endGame } = props
        clearInterval(interval)
        endGame()
      }
      setTimer(time)
    }, 1000)
  }

  const getStart = () => {
    const { startGame } = props
    return new Promise((resolve, reject) => {
      resolve(setLoading(true))
    })
      .then(() => {
        setTimeout(() => {
          countDown(600)
          // countDown(5)
          startGame()
        }, 1000)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <View
      style={[
        styles.container,
        styles.flexRow,
        styles.justifyCenter,
        styles.my5
      ]}
    >
      {(() => {
        const { isStarted } = props
        if (!isStarted) {
          return (
            <View style={[styles.w80]}>
              <Button
                mode="contained"
                color="blue"
                onPress={() => getStart()}
                loading={loading ? true : false}
              >
                {!loading ? 'START' : 'Loading'}
              </Button>
            </View>
          )
        } else {
          return <Text style={[styles.textCenter, styles.medium]}>{timer}</Text>
        }
      })()}
    </View>
  )
}

export default Timer
