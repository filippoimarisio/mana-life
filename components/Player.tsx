import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import PlayerMenu from './PlayerMenu';

export default function Player() {

  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.counter]}>
        <TouchableOpacity onPress={()=>setCounter(counter - 1)} style={styles.counterButton}><Text>-</Text></TouchableOpacity>
          <Text style={styles.counterAmount}>{counter}</Text>
        <TouchableOpacity onPress={()=>setCounter(counter + 1)} style={styles.counterButton}><Text>+</Text></TouchableOpacity>
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
    padding: 40
  },
  counterAmount: {
    fontSize: 120
  },
  counterButton: {
    padding: 20,
    backgroundColor: 'white'
  }
});
