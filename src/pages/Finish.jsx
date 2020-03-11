import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-paper'

import styles from '../../styles'
import { useSelector, useDispatch } from 'react-redux'
import { playAgain } from '../store/actions/boardAction'

const Finish = (props) => {
  const dispatch = useDispatch()
  const isSolved = useSelector((state) => state.boardReducer.isSolved)

  useEffect(() => {
    console.log('Finish')
  }, [])

  const newGame = () => {
    dispatch(playAgain())
    props.navigation.navigate('Home')
  }

  return (
    <View style={[styles.flex, styles.tengahin, styles.hFull]}>
      <View style={[styles.container, styles.justifyCenter]}>
        <View style={[styles.mb5]}>
          <Text
            style={[styles.fontBold, styles.xlarge]}
            maxFontSizeMultiplier={4}
          >
            {isSolved ? 'GOOD JOB' : 'GAME OVER'}
          </Text>
        </View>

        <View style={styles.card}>
          {(() => {
            if (isSolved) {
              return (
                <Text
                  style={[
                    styles.large,
                    { paddingVertical: 5, fontWeight: 'bold' }
                  ]}
                >
                  Congratulation!
                </Text>
              )
            } else {
              return (
                <Text
                  style={[
                    styles.large,
                    { paddingVertical: 5, fontWeight: 'bold' }
                  ]}
                >
                  Try Again Please!
                </Text>
              )
            }
          })()}
        </View>

        <View style={[styles.my5]}>
          <Button
            mode="contained"
            color="#57AFC9"
            dark={true}
            onPress={() => newGame()}
          >
            PLAY AGAIN
          </Button>
        </View>
      </View>
    </View>
  )
}

export default Finish
