import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { View, Text, TextInput } from 'react-native'

import styles from '../../styles'

import { startGame } from '../store/actions/userAction'

const Home = (props) => {
  const [username, setUsername] = useState('')
  const [level, setLevel] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('Home')
  }, [])

  function submit() {
    if (level != '' && username != '') {
      console.log(1)
      dispatch(startGame(username, level))
      setUsername('')
      setLevel('')
      props.navigation.navigate('Game')
    } else {
      if (level === '') {
        alert('Select level first')
      } else if (username === '') {
        alert('Username is required')
      } else {
        alert('Please type your name and select level')
      }
    }
  }

  return (
    <View style={[styles.flex, styles.tengahin, styles.hFull]}>
      <Text
        style={[styles.xlarge, styles.fontBold, styles.textCenter, styles.my5]}
      >
        SUDOKU GAME
      </Text>
      <TextInput
        value={username}
        style={[
          styles.borderBottom,
          styles.w80,
          styles.mb5,
          styles.mt10,
          styles.textCenter
        ]}
        onChangeText={(text) => setUsername(text)}
        placeholder="Input Your Name Here"
      />
      <View style={[styles.flex, styles.flexRow, styles.justifyAround]}>
        <View>
          <Button
            mode="contained"
            onPress={() => setLevel('easy')}
            disabled={level === 'easy' ? true : false}
          >
            Easy
          </Button>
        </View>
        <View style={[styles.mx10]}>
          <Button
            mode="contained"
            onPress={() => setLevel('medium')}
            disabled={level === 'medium' ? true : false}
          >
            Medium
          </Button>
        </View>
        <View>
          <Button
            mode="contained"
            onPress={() => setLevel('hard')}
            disabled={level === 'hard' ? true : false}
          >
            Hard
          </Button>
        </View>
      </View>

      <View style={[styles.flex, styles.tengahin, styles.mt10]}>
        <Button onPress={() => submit()} mode="outlined" dark={true}>
          START GAME
        </Button>
      </View>
    </View>
  )
}

export default Home
