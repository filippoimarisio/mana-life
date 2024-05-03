import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import React, {memo, useMemo, useContext} from 'react';
import { Mana, colorCodes, Operations } from '../utils'
import {Context} from '../context'
import ManaButton from './ManaButton'

const PlayerMenuMana: React.FC<{}> = () => {
  console.log('refresh PlayerMenuMana')

  type ValueOf<T> = T[keyof T];
  interface ContextType {
    manaCounter: Record<string, number>;
    backgroundColor: string;
    elementsColor: string;
    modifyManaCounter: any
  }
  const contextValues = useContext(Context) as ContextType;
  const { manaCounter, backgroundColor, elementsColor, modifyManaCounter } = useMemo(() => contextValues, [contextValues]);
  

  const resetCounters = () => {
    modifyManaCounter({
      mountain: 0,
      swamp: 0,
      forest: 0,
      plains: 0,
      island: 0,
      colorless: 0
    })
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
    modifyManaCounter(updatedCounterObject);
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

  return (
    <View style={styles.container}>
      <View style={styles.manaList}>
        <View style={styles.manaElement}><ManaButton baseColor={colorCodes.forest} highlightColor={colorCodes.forest_logo} colorIdentity={Mana.forest}/></View>
        <View style={styles.manaElement}><ManaButton baseColor={colorCodes.plains_logo} highlightColor={colorCodes.plains} colorIdentity={Mana.plains}/></View>
        <View style={styles.manaElement}><ManaButton baseColor={colorCodes.island} highlightColor={colorCodes.island_logo} colorIdentity={Mana.island}/></View>
        <View style={styles.manaElement}><ManaButton baseColor={colorCodes.mountain} highlightColor={colorCodes.mountain_logo} colorIdentity={Mana.mountain}/></View>
        <View style={styles.manaElement}><ManaButton baseColor={colorCodes.swamp} highlightColor={colorCodes.swamp_logo} colorIdentity={Mana.swamp}/></View>
        <View style={styles.manaElement}><ManaButton baseColor={colorCodes.colorless} highlightColor={colorCodes.colorless_logo} colorIdentity={Mana.colorless}/></View>
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

export default memo(PlayerMenuMana);

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
  wubrgButton: {
    height: 10,
    width: '100%'
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
  },
  counterButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  manaElement: {
    height: '33.3%',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
