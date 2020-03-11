import { StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native'

import margin from './margin'

const { width } = Dimensions.get('window')
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

const scale = SCREEN_WIDTH / 320

export function normalize(size) {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

const styles = StyleSheet.create({
  ...margin,
  container: {
    display: 'flex',
    marginHorizontal: (width * 10) / 100
  },
  bgBlue: {
    backgroundColor: 'blue'
  },
  mini: {
    fontSize: normalize(12)
  },
  small: {
    fontSize: normalize(15)
  },
  medium: {
    fontSize: normalize(17)
  },
  large: {
    fontSize: normalize(20)
  },
  xlarge: {
    fontSize: normalize(24)
  },
  fontBold: {
    fontWeight: 'bold'
  },
  flex: {
    display: 'flex'
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexCol: {
    flexDirection: 'column'
  },
  justifyCenter: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  justifyEvenly: {
    justifyContent: 'space-evenly'
  },
  justifyAround: {
    justifyContent: 'space-around'
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  tengahin: {
    textAlign: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 0
  },
  border: {
    width: 35,
    height: 35,
    borderColor: 'black',
    borderWidth: 1
  },
  border1: {
    borderWidth: 1
  },
  borderGray: {
    borderColor: 'gray'
  },
  borderBottom: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  borderRadius10: {
    borderRadius: 10
  },
  board: {
    display: 'flex',
    flexDirection: 'row'
  },
  textCenter: {
    textAlign: 'center'
  },
  w80: {
    width: (width * 80) / 100
  },
  hFull: {
    height: SCREEN_HEIGHT
  },
  card: {
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    minHeight: (SCREEN_HEIGHT * 5) / 100,
    minWidth: (SCREEN_WIDTH * 50) / 100,
    alignItems: 'center',
    alignContent: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})

export default styles
