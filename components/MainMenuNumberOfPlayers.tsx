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
      <TouchableOpacity onPress={()=> setPlayersNumber(2)} activeOpacity={1} delayPressIn={0} style={{flex:1, width:'33%'}}>
        <View style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 25, width: 25, tintColor: tintColor(2)}}/> 
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 25, width: 25, tintColor: tintColor(2)}}/> 
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> setPlayersNumber(3)} activeOpacity={1} delayPressIn={0} style={{flex:1, width:'33%'}}>
        <View style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <Image 
            source={require('../assets/account.png')} 
            resizeMode = 'contain' 
            style= {{ height: 25, width: 25, tintColor: tintColor(3)}}/>
          <View style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <Image 
              source={require('../assets/account.png')} 
              resizeMode = 'contain' 
              style= {{ height: 25, width: 25, tintColor: tintColor(3)}}/> 
            <Image 
              source={require('../assets/account.png')} 
              resizeMode = 'contain' 
              style= {{ height: 25, width: 25, tintColor: tintColor(3)}}/>
          </View>            
        </View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> setPlayersNumber(4)} activeOpacity={1} delayPressIn={0} style={{flex:1, width:'33%'}}>
        <View style={{display: 'flex', justifyContent:'center', alignItems:'flex-end', flexDirection:'column'}}>
          <View style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <Image 
              source={require('../assets/account.png')} 
              resizeMode = 'contain' 
              style= {{ height: 25, width: 25, tintColor: tintColor(4)}}/> 
            <Image 
              source={require('../assets/account.png')} 
              resizeMode = 'contain' 
              style= {{ height: 25, width: 25, tintColor: tintColor(4)}}/> 
          </View>
          <View style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'row'}}>
            <Image 
              source={require('../assets/account.png')} 
              resizeMode = 'contain' 
              style= {{ height: 25, width: 25, tintColor: tintColor(4)}}/> 
            <Image 
              source={require('../assets/account.png')} 
              resizeMode = 'contain' 
              style= {{ height: 25, width: 25, tintColor: tintColor(4)}}/> 
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
