import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, {useState, useContext} from 'react';
import {CounterTypes} from '../utils'
import {Context} from '../App';

export default function PlayerMenuCounters() {

  type ValueOf<T> = T[keyof T];
  const [selectedCounterTypes, setSelectedCounterTypes] = useContext(Context)

  const onSelectCounter = (counterType: ValueOf<typeof CounterTypes>) => {
    if(selectedCounterTypes.includes(counterType)) setSelectedCounterTypes([...selectedCounterTypes.filter(type=>type !== counterType)])
    else setSelectedCounterTypes([...selectedCounterTypes, counterType])
  }

  const tintColor = (counterType: ValueOf<typeof CounterTypes>): string => {
    return selectedCounterTypes.includes(counterType) ? 'white' : 'gray'
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> onSelectCounter(CounterTypes.poison)}>
        <Image 
          source={require('../assets/poison-logo.png')} 
          resizeMode = 'contain' 
          style= {{ height: 80, width: 80, tintColor: tintColor(CounterTypes.poison)}}/> 
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onSelectCounter(CounterTypes.edh)}>
        <Image 
          source={require('../assets/edh-logo.png')} 
          resizeMode = 'contain' 
          style= {{ height: 100, width: 100, tintColor: tintColor(CounterTypes.edh)}}/> 
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> onSelectCounter(CounterTypes.storm)}>
        <Image 
          source={require('../assets/storm-logo.png')} 
          resizeMode = 'contain' 
          style= {{ height: 80, width: 80, tintColor: tintColor(CounterTypes.storm)}}/> 
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
