import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import React, {useContext, memo} from 'react';
import {Context} from '../context'

const MainMenuTimerSettings = () => {

  const {elementsColor, showTimer, setShowTimer, setTime, time} = useContext(Context) as any

  const toggleSwitch = () => setShowTimer(previousState => !previousState);

  const formatTime = () => {
    const { minutes, seconds } = time;
    return `${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <View style={styles.timer}>
      <TouchableOpacity onPress={()=>toggleSwitch()} activeOpacity={1} delayPressIn={0}>
        <Text style={[styles.showText, {color: showTimer ? elementsColor : 'gray', borderColor:showTimer ? elementsColor :'transparent'}]}>SHOW</Text>
      </TouchableOpacity>
      <View style={styles.timerSetter}>
        <TouchableOpacity onPress={()=>setTime({ minutes: time.minutes + 5, seconds: 0 })} style={{width: '100%', height:30, alignItems:'center', justifyContent:'flex-end'}} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/chevron-up.png`)} resizeMode = 'contain' style= {{ height: 20, width: 20, tintColor: showTimer ? elementsColor : 'gray'}}/>
        </TouchableOpacity>
        <Text style={[styles.timerText, {color: showTimer ? elementsColor : 'gray'}]}>{formatTime()}</Text>
        <TouchableOpacity onPress={()=>setTime({minutes: time.minutes < 5 ? time.minutes : time.minutes - 5, seconds: 0 })} style={{width: '100%', height:30, alignItems:'center'}} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/chevron-down.png`)} resizeMode = 'contain' style= {{ height: 20, width: 20, tintColor: showTimer ? elementsColor : 'gray'}}/>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={()=>setTime({ minutes: 50, seconds: 0 })} activeOpacity={1} delayPressIn={0}>
        <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: elementsColor}}/>
      </TouchableOpacity>
    </View>
  )
}

export default memo(MainMenuTimerSettings)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  timer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  timerSetter: {
    display: 'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  timerText: {
    fontSize: 40,
  },
  showText: {
    fontSize: 20, textAlign:'center', textAlignVertical:'center', padding: 6, borderRadius: 6, borderWidth: 3,
  }
});
