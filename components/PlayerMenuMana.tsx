import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { Mana, colorCodes } from '../utils'
import { Operations } from './Player'

export default function PlayerMenuMana({}) {

  type ValueOf<T> = T[keyof T];

  const [manaCounter, setManaCounter] = useState({
    mountain: 0,
    swamp: 0,
    forest: 0,
    plains: 0,
    island: 0,
    colorless: 0
  });

  const handleCounterInteraction = (mana: ValueOf<typeof Mana>, operation: ValueOf<typeof Operations>) => {
    const modifier = operation === Operations.plus ? 1 : -1;
    const counterObject = {...manaCounter, [mana]: manaCounter[mana] + modifier};
    setManaCounter(counterObject);
}


  const ManaCounter = ({manaColor}) => {
    return (
      <View style={[styles.manaCounter]}>
        <TouchableOpacity onPress={()=>handleCounterInteraction(manaColor, Operations.minus)} style={styles.counterButton}>
            <Image
              source={require('../assets/minus-logo__white.png')}
              resizeMode = 'contain'
              style= {{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.manaCounterDigit}>{manaCounter[manaColor]}</Text>
          <TouchableOpacity onPress={()=>handleCounterInteraction(manaColor, Operations.plus)} style={styles.counterButton}>
            <Image
              source={require('../assets/plus-logo__white.png')}
              resizeMode = 'contain'
              style= {{
                height: 30,
                width: 30,
              }}
            />
          </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.manaList}>
        <View style={[styles.manaElement, { backgroundColor: colorCodes['mountain'] }]}>
          <Image source={require('../assets/mountain-logo__colored.png')} resizeMode = 'contain' style={[{ height: 20, width: 20}]}/>
          <ManaCounter manaColor={'mountain'}/>
        </View>
        <View style={[styles.manaElement, { backgroundColor: colorCodes['swamp'] }]}>
          <Image source={require('../assets/swamp-logo__colored.png')} resizeMode = 'contain' style={[{ height: 20, width: 20}]}/>
          <ManaCounter manaColor={'swamp'}/>
        </View>
        <View style={[styles.manaElement, { backgroundColor: colorCodes['forest'] }]}>
          <Image source={require('../assets/forest-logo__colored.png')} resizeMode = 'contain' style={[{ height: 20, width: 20}]}/>
          <ManaCounter manaColor={'forest'}/>
        </View>
        <View style={[styles.manaElement, { backgroundColor: colorCodes['plains'] }]}>
          <Image source={require('../assets/plains-logo__colored.png')} resizeMode = 'contain' style={[{ height: 20, width: 20}]}/>
          <ManaCounter manaColor={'plains'}/>
        </View>
        <View style={[styles.manaElement, { backgroundColor: colorCodes['island'] }]}>
          <Image source={require('../assets/island-logo__colored.png')} resizeMode = 'contain' style={[{ height: 20, width: 20}]}/>
          <ManaCounter manaColor={'island'}/>
        </View>
        <View style={[styles.manaElement, { backgroundColor: colorCodes['mountain'] }]}>
          <Image source={require('../assets/mountain-logo__colored.png')} resizeMode = 'contain' style={[{ height: 20, width: 20}]}/>
          <ManaCounter manaColor={'mountain'}/>
        </View>
      </View>
      <View style={styles.wubrg}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  wubrg: {
    width: '20%',
    backgroundColor: 'yellow',
    height: '100%',
  },
  manaList: {
    height: '100%',
    width: '80%',
    backgroundColor: 'blue',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  manaElement: {
    height: '33.3%',
    width: '50%',
    backgroundColor: 'green',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  manaCounter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  manaCounterDigit: {
    fontSize: 40,
    color: 'white',
    shadowColor: 'black',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  counterButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
