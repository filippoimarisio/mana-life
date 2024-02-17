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
      <View style={[styles.manaCounter, { borderColor: colorCodes[manaColor + '_logo']}]}>
        <TouchableOpacity onPress={()=>handleCounterInteraction(manaColor, Operations.minus)} style={styles.counterButton}>
          <Image
            source={require('../assets/minus-logo__white.png')}
            resizeMode = 'contain'
            style= {{
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.manaCounterDigit}>{manaCounter[manaColor]}</Text>
        <TouchableOpacity onPress={()=>handleCounterInteraction(manaColor, Operations.plus)} style={styles.counterButton}>
          <Image
            source={require('../assets/plus-logo__white.png')}
            resizeMode = 'contain'
            style= {{
              height: 25,
              width: 25,
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.manaList}>
        <View style={[styles.manaElement]}>
          <View style={[styles.manaLogoWrapper, {borderColor: colorCodes['mountain_logo'],}]}>
            <Image source={require('../assets/mountain-logo__colored.png')} resizeMode = 'contain' style={[{ height: 25, width: 25}]}/>
          </View>
          <ManaCounter manaColor={'mountain'}/>
        </View>
        <View style={[styles.manaElement]}>
          <View style={[styles.manaLogoWrapper, {borderColor: colorCodes['swamp_logo'],}]}>
            <Image source={require('../assets/swamp-logo__colored.png')} resizeMode = 'contain' style={[{ height: 25, width: 25}]}/>
          </View>
          <ManaCounter manaColor={'swamp'}/>
        </View>
        <View style={[styles.manaElement]}>
          <View style={[styles.manaLogoWrapper, {borderColor: colorCodes['forest_logo'],}]}>
            <Image source={require('../assets/forest-logo__colored.png')} resizeMode = 'contain' style={[{ height: 25, width: 25}]}/>
          </View>
          <ManaCounter manaColor={'forest'}/>
        </View>
        <View style={[styles.manaElement]}>
          <View style={[styles.manaLogoWrapper, {borderColor: colorCodes['plains_logo'],}]}>
            <Image source={require('../assets/plains-logo__colored.png')} resizeMode = 'contain' style={[{ height: 25, width: 25}]}/>
          </View>
          <ManaCounter manaColor={'plains'}/>
        </View>
        <View style={[styles.manaElement]}>
          <View style={[styles.manaLogoWrapper, {borderColor: colorCodes['island_logo'],}]}>
            <Image source={require('../assets/island-logo__colored.png')} resizeMode = 'contain' style={[{ height: 25, width: 25}]}/>
          </View>
          <ManaCounter manaColor={'island'}/>
        </View>
        <View style={[styles.manaElement]}>
          <View style={[styles.manaLogoWrapper, {borderColor: colorCodes['mountain_logo'],}]}>
            <Image source={require('../assets/mountain-logo__colored.png')} resizeMode = 'contain' style={[{ height: 25, width: 25}]}/>
          </View>
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  manaElement: {
    height: '33.3%',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  manaCounter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 40,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    paddingTop: 10
  },
  manaCounterDigit: {
    fontSize: 35,
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
  manaLogoWrapper: {
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    marginBottom: -18,
    backgroundColor: 'white',
    zIndex: 2
  }
});
