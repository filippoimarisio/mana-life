import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PlayerMenu from './PlayerMenu';

export default function Player() {

  const [counter, setCounter] = useState(20);
  const [tempCounter, setTempCounter] = useState(0);
  const [showTempCounter, setShowTempCounter] = useState(false)

  enum Operations {
    plus = 'plus',
    minus = 'minus'
  }

  type ValueOf<T> = T[keyof T];

  const displayTempCounter = () => {
    setShowTempCounter(true)
    setTimeout(()=> {
      setShowTempCounter(false)
      setTempCounter(0)
    }, 3000)
  }

  const handleCounterInteraction = (operation: ValueOf<typeof Operations>) => {
    if (operation === Operations.plus) {
      setCounter(counter + 1)
      setTempCounter(tempCounter + 1)
    }
    if (operation === Operations.minus) {
      setCounter(counter - 1)
      setTempCounter(tempCounter - 1)
    }
    if (!showTempCounter) displayTempCounter()
  }

  return (
    <View style={styles.container}>
      <View style={styles.tempCounterWrapper}>
        <Text style={[styles.tempCounter, !showTempCounter && styles.hide]}>{tempCounter}</Text>
      </View>
      <View style={[styles.container, styles.counter]}>
        <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.minus)} style={styles.counterButton}>
          <Image
            source={require('../assets/minus-circle-outline.png')}
            resizeMode = 'contain'
            style= {{
              height: 40,
              width: 40,
              tintColor: 'black'
            }}
          />
        </TouchableOpacity>
        <Text style={styles.counterAmount}>{counter}</Text>
        <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.plus)} style={styles.counterButton}>
          <Image
            source={require('../assets/plus-circle-outline.png')}
            resizeMode = 'contain'
            style= {{
              height: 40,
              width: 40,
              tintColor: 'black'
            }}
          />
        </TouchableOpacity>
      </View>
      <PlayerMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  counter: {
    flexDirection: 'row',
    
  },
  counterAmount: {
    fontSize: 150
  },
  counterButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tempCounterWrapper: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'flex-end',
  },
  tempCounter: {
    fontSize: 30
  },
  hide: {
    display: 'none'
  }
});
