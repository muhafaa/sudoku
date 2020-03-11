import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import styles from '../../styles'

const Loading = () => {
  return (
    <View style={[styles.flex, styles.tengahin, styles.hFull]}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading Please Wait</Text>
    </View>
  )
}

export default Loading
