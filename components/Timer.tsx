import React, {useContext, useState, useRef } from 'react';
import { Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {Context} from '../context';


export default function Timer({time, setTime, timerOn, setTimerOn}) {
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const {backgroundColor, elementsColor} = useContext(Context) as any

  const startTimer = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime.minutes === 0 && prevTime.seconds === 0) {
            clearInterval(intervalRef.current!);
            return prevTime;
          } else if (prevTime.seconds === 0) {
            return { minutes: prevTime.minutes - 1, seconds: 59 };
          } else {
            return { ...prevTime, seconds: prevTime.seconds - 1 };
          }
        });
      }, 1000);
      setTimerOn(true);
    }
  };

  const stopTimer = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setTimerOn(false);
    }
  };

  const formatTime = () => {
    const { minutes, seconds } = time;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const toggleTimer = () => {
    if (timerOn) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <TouchableOpacity 
      onPress={toggleTimer} 
      activeOpacity={1} delayPressIn={0}
      style={[
        styles.timer, 
        time.minutes === 0 && time.seconds === 0 && styles.timerExpired,
        {backgroundColor: backgroundColor}
      ]}>
      { timerOn && <Image source={require(`../assets/pause-circle-outline.png`)} resizeMode = 'contain' style= {{ height: 15, width: 15, tintColor: time.minutes === 0 && time.seconds === 0 ? 'red' : elementsColor}}/>}
      { !timerOn && <Image source={require(`../assets/play-circle-outline.png`)} resizeMode = 'contain' style= {{ height: 15, width: 15, tintColor: time.minutes === 0 && time.seconds === 0 ? 'red' : elementsColor}}/>}
      <Text style={[styles.timerText, {color: time.minutes === 0 && time.seconds === 0 ? 'red' : elementsColor}]}>{formatTime()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  timer: {
    backgroundColor: '#ccc',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#DAA520'
  },
  timerExpired: {
    backgroundColor: 'red',
  },
  timerText: {
    fontSize: 20,
  },
});
