import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import { Mana, colorCodes, Operations } from '../utils'
import {Context} from '../context'

export default function PlayerMenuMana({manaCounter,setManaCounter}) {

  type ValueOf<T> = T[keyof T];
  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor] = useContext(Context)

  const resetCounters = () => {
    setManaCounter({
      mountain: 0,
      swamp: 0,
      forest: 0,
      plains: 0,
      island: 0,
      colorless: 0
    })
  }

  const handleCounterInteraction = (mana: ValueOf<typeof Mana>, operation: ValueOf<typeof Operations>) => {
    const modifier = operation === Operations.plus ? 1 : -1;
    const counterObject = {...manaCounter, [mana]: manaCounter[mana] + modifier};
    setManaCounter(counterObject);
  }

  const handleWubrgInteraction = (operation: ValueOf<typeof Operations>) => {
    const updatedCounterObject = {...manaCounter};

    // Define which mana colors should be updated and which should be skipped
    const colorsToUpdate = Object.keys(updatedCounterObject).filter(color => color !== 'colorless');

    // Update each mana color based on the operation
    colorsToUpdate.forEach(color => {
        if (operation === Operations.plus) {
            updatedCounterObject[color]++;
        } else {
            updatedCounterObject[color]--;
        }
    });

    setManaCounter(updatedCounterObject);
}

  const ManaCounter = ({manaColor}) => {
    return (
      <View style={[styles.manaCounter, { borderColor: manaColor === 'plains' ?  colorCodes[manaColor] : colorCodes[manaColor + '_logo']}]}>
        <TouchableOpacity onPress={()=>handleCounterInteraction(manaColor, Operations.minus)} style={styles.counterButton} activeOpacity={1} delayPressIn={0}>
          <Image
            source={require('../assets/minus-logo__white.png')}
            resizeMode = 'contain'
            style= {{
              height: 25,
              width: 25,
              tintColor: elementsColor
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.manaCounterDigit, {color: elementsColor, shadowColor: backgroundColor, textShadowColor: backgroundColor}]}>{manaCounter[manaColor]}</Text>
        <TouchableOpacity onPress={()=>handleCounterInteraction(manaColor, Operations.plus)} style={styles.counterButton} activeOpacity={1} delayPressIn={0}>
          <Image
            source={require('../assets/plus-logo__white.png')}
            resizeMode = 'contain'
            style= {{
              height: 25,
              width: 25,
              tintColor: elementsColor
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const Wubrg = () => {
    return (
      <View style={styles.wubrg}>
        <TouchableOpacity onPress={()=>handleWubrgInteraction(Operations.minus)} style={[styles.counterButton, styles.wubrgButton]} activeOpacity={1} delayPressIn={0}>
          <Image
            source={require('../assets/minus-logo__white.png')}
            resizeMode = 'contain'
            style= {{
              height: 25,
              width: 25,
              tintColor: elementsColor
            }}
          />
        </TouchableOpacity>
        <Image source={require('../assets/wubrg_compact.png')} resizeMode = 'contain' style={[{ height: 55, width: 55}]}/>
        <TouchableOpacity onPress={()=>handleWubrgInteraction(Operations.plus)} style={[styles.counterButton, styles.wubrgButton]} activeOpacity={1} delayPressIn={0}>
          <Image
            source={require('../assets/plus-logo__white.png')}
            resizeMode = 'contain'
            style= {{
              height: 25,
              width: 25,
              tintColor: elementsColor
            }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  const ManaButton = ({baseColor, highlightColor, colorIdentity}) => {
    return (
      <View style={[styles.manaElement]}>
        <View style={[styles.manaLogoWrapper, {backgroundColor: baseColor, borderColor: highlightColor, borderWidth: 2}]}>
          <View style={[styles.manaLogo, {backgroundColor: highlightColor}]}></View>
        </View>
        <ManaCounter manaColor={colorIdentity}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.manaList}>
        <ManaButton baseColor={colorCodes.forest} highlightColor={colorCodes.forest_logo} colorIdentity={Mana.forest}/>
        <ManaButton baseColor={colorCodes.plains_logo} highlightColor={colorCodes.plains} colorIdentity={Mana.plains}/>
        <ManaButton baseColor={colorCodes.island} highlightColor={colorCodes.island_logo} colorIdentity={Mana.island}/>
        <ManaButton baseColor={colorCodes.mountain} highlightColor={colorCodes.mountain_logo} colorIdentity={Mana.mountain}/>
        <ManaButton baseColor={colorCodes.swamp} highlightColor={colorCodes.swamp_logo} colorIdentity={Mana.swamp}/>
        <ManaButton baseColor={colorCodes.colorless} highlightColor={colorCodes.colorless_logo} colorIdentity={Mana.colorless}/>
      </View>
      <View style={[styles.auxiliary, {borderLeftColor: elementsColor}]}>
        <Wubrg/>
        <View style={styles.reset}>
          <TouchableOpacity onPress={()=>resetCounters()} activeOpacity={1} delayPressIn={0}>
            <Image source={require('../assets/restart.png')} resizeMode = 'contain' style={[{ tintColor: elementsColor, height: 40, width: 40}]}/>
          </TouchableOpacity>
        </View>
      </View>
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
  auxiliary: {
    width: '20%',
    height: '100%',
    borderLeftWidth: 1,
    marginLeft: 20
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
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  counterButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  wubrgButton: {
    height: 10,
    width: '100%'
  },
  manaLogoWrapper: {
    marginBottom: -12,
    zIndex: 2,
    height: 25,
    width: 25,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  manaLogo: {
    height: 18,
    width: 18,
    borderRadius: 30
  },
  wubrg: {
    alignItems: 'center',
    height: '50%'
  },
  reset: {
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20
  }
});
