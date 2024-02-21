import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, {useState, useContext} from 'react';
import {Context} from '../context'

export default function MainMenuNumberOfPlayers() {

  type ValueOf<T> = T[keyof T];

  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor, playersNumber, setPlayersNumber] = useContext(Context)

  const tintColor = (players: number): string => {
    return playersNumber === players ? elementsColor : 'gray'
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> setPlayersNumber(2)}>
        <View style={{display: 'flex', justifyContent:'center', flexDirection:'row'}}>
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(2)}}/> 
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(2)}}/> 
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> setPlayersNumber(3)}>
        <View style={{display: 'flex', justifyContent:'center', flexDirection:'row'}}>
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(3)}}/> 
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(3)}}/> 
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(3)}}/>
        </View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> setPlayersNumber(4)}>
        <View style={{display: 'flex', justifyContent:'center', flexDirection:'row'}}>
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(4)}}/> 
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(4)}}/> 
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(4)}}/> 
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 70, width: 70, tintColor: tintColor(4)}}/> 
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
