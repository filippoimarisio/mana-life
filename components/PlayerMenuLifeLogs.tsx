import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Context} from '../context'

export default function PlayerMenuLifeLogs({playerIndex, lifeLogs}) {

  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor] = useContext(Context)
  
  const playerLogs = playerIndex === 0 ? lifeLogs[0] : lifeLogs[1]
  const opponentLogs = playerIndex === 0 ? lifeLogs[1] : lifeLogs[0]

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.names, {borderBottomColor: elementsColor}]}>
          <Text style={[styles.playerBox, {color: elementsColor,borderRightColor: elementsColor}]}>Me</Text>
          <Text style={[styles.opponentBox, {color: elementsColor}]}>You</Text>
        </View>
        <ScrollView style={styles.logsWrapper}>
          <View style={styles.logs}>
            <View style={[styles.playerLogs,{borderRightColor: elementsColor}]}>
              {playerLogs.map((log: number, logIndex: number) => {
                return (
                  <Text key={logIndex} style={[styles.log, logIndex !== playerLogs.length - 1 && styles.lineThrough, {color: elementsColor}]}>{log}</Text>
                )
              })}
            </View>
            <View style={styles.opponentLogs}>
              {opponentLogs.map((log: number, logIndex: number) => {
                return (
                  <Text key={logIndex} style={[styles.log, logIndex !== opponentLogs.length - 1 && styles.lineThrough, {color: elementsColor}]}>{log}</Text>
                )
              })}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  wrapper: {
    width: "70%",
    height: '80%',
  },
  names: {
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  playerBox: {
    borderRightWidth: 2,
    width: '50%',
    textAlign: 'center',
    fontSize: 30,
  },
  opponentBox: {
    width: '50%',
    textAlign: 'center',
    fontSize: 30,
  },
  logsWrapper: {
    maxHeight: '100%',
    height: '100%',
    overflow: 'scroll',
  },
  logs: {
    flexDirection: 'row',
    minHeight: 200,
  },
  playerLogs: {
    width: '50%',
    alignItems: 'center',
    borderRightWidth: 2,
  },
  opponentLogs: {
    width: '50%',
    alignItems: 'center',
  },
  log: {
    fontSize: 30,
    paddingTop: 4,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    fontSize: 20,
  }
});
