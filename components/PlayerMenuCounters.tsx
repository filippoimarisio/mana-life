import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, {useContext} from 'react';
import {CounterTypes, scaleSize, Size} from '../utils'
import { Context } from '../context';

export default function PlayerMenuCounters({selectedCounterTypes, setSelectedCounterTypes, size}) {

  type ValueOf<T> = T[keyof T];
  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor] = useContext(Context)

  const onSelectCounter = (counterType: ValueOf<typeof CounterTypes>) => {
    if(selectedCounterTypes.includes(counterType)) setSelectedCounterTypes([...selectedCounterTypes.filter(type=>type !== counterType)])
    else setSelectedCounterTypes([...selectedCounterTypes, counterType])
  }

  const tintColor = (counterType: ValueOf<typeof CounterTypes>): string => {
    return selectedCounterTypes.includes(counterType) ? elementsColor : 'gray'
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> onSelectCounter(CounterTypes.poison)} activeOpacity={1} delayPressIn={0}>
        <Image 
          source={require('../assets/poison-logo.png')} 
          resizeMode = 'contain' 
          style= {{ height: scaleSize(80, size), width: scaleSize(80, size), tintColor: tintColor(CounterTypes.poison)}}/> 
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onSelectCounter(CounterTypes.edh)} activeOpacity={1} delayPressIn={0}>
        <Image 
          source={require('../assets/edh-logo.png')} 
          resizeMode = 'contain' 
          style= {{ height: scaleSize(100, size), width: scaleSize(100, size), tintColor: tintColor(CounterTypes.edh)}}/> 
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onSelectCounter(CounterTypes.storm)} activeOpacity={1} delayPressIn={0}>
        <Image 
          source={require('../assets/storm-logo.png')} 
          resizeMode = 'contain' 
          style= {{ height: scaleSize(80, size), width: scaleSize(80, size), tintColor: tintColor(CounterTypes.storm)}}/> 
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
