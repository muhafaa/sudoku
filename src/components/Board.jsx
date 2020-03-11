import React from 'react'
import { SafeAreaView, FlatList, TextInput, View } from 'react-native'
import styles from '../../styles'

const Board = ({ boards, changeBoard }) => {
  return (
    <SafeAreaView style={[styles.flex, styles.justifyCenter]}>
      <FlatList
        data={boards}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.board}>
              {item.map((board, y) => {
                if (board > 0) {
                  return (
                    <TextInput
                      key={y}
                      style={[
                        styles.border,
                        styles.tengahin,
                        { backgroundColor: 'silver' }
                      ]}
                      keyboardType={'numeric'}
                      maxLength={1}
                    >
                      {board}
                    </TextInput>
                  )
                } else {
                  return (
                    <TextInput
                      key={y}
                      style={[styles.border, styles.tengahin]}
                      keyboardType={'numeric'}
                      maxLength={1}
                      value={`${board === 0 ? '' : ''}`}
                      onChangeText={(text) => changeBoard(text, index, y)}
                    ></TextInput>
                  )
                }
              })}
            </View>
          )
        }}
        keyExtractor={(item, i) => `${i}`}
      />
    </SafeAreaView>
  )
}

export default Board
