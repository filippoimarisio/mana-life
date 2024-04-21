import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React, {useContext, memo} from 'react';
import {Context} from '../context'

const MainMenuFullArtSelector = ({onFullArtPlayerIndex}) => {

  const {playersNumber, fullArtPlayerIndex, elementsColor} = useContext(Context) as any
  
  const selectedValues = {
    borderColor: elementsColor,
    color: elementsColor
  }

  return ([...Array(playersNumber)].map((e, i) => {
    return <View key={i} style={[styles.playerArtElement__wrapper]}>
      <TouchableOpacity onPress={()=>onFullArtPlayerIndex(i)} style={[styles.playerArtElement, fullArtPlayerIndex === i && selectedValues]} activeOpacity={1} delayPressIn={0}>
        <Text style={[styles.playerArtElement_text, fullArtPlayerIndex === i && selectedValues]}>P{i + 1}</Text>
      </TouchableOpacity>
    </View>
  }))
}

export default memo(MainMenuFullArtSelector)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  playerArtElement__wrapper: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerArtElement: {
    borderWidth: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderRadius: 10,
    marginRight: 20,
    height: 40,
    width: 40
  },
  playerArtElement_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});
