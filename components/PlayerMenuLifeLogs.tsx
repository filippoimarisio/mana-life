import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Context} from '../App';

export default function PlayerMenuLifeLogs({playerIndex}) {

  const [lifeLogsPlayerOne, setLifeLogsPlayerOne, lifeLogsPlayerTwo, setLifeLogsPlayerTwo, resetTrigger, setResetTrigger] = useContext(Context)
  
  const playerLogs = playerIndex === 0 ? lifeLogsPlayerOne : lifeLogsPlayerTwo
  const opponentLogs = playerIndex === 0 ? lifeLogsPlayerTwo : lifeLogsPlayerOne

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.names}>
          <Text style={styles.playerBox}>Me</Text>
          <Text style={styles.opponentBox}>You</Text>
        </View>
        <ScrollView style={styles.logsWrapper}>
          <View style={styles.logs}>
            <View style={styles.playerLogs}>
              {playerLogs.map((log: number, logIndex: number) => {
                return (
                  <Text key={logIndex} style={[styles.log, logIndex !== playerLogs.length - 1 && styles.lineThrough]}>{log}</Text>
                )
              })}
            </View>
            <View style={styles.opponentLogs}>
              {opponentLogs.map((log: number, logIndex: number) => {
                return (
                  <Text key={logIndex} style={[styles.log, logIndex !== opponentLogs.length - 1 && styles.lineThrough]}>{log}</Text>
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
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  playerBox: {
    borderRightColor: 'white',
    borderRightWidth: 2,
    width: '50%',
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
  },
  opponentBox: {
    width: '50%',
    textAlign: 'center',
    fontSize: 30,
    color: 'white'
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
    borderRightColor: 'white',
    borderRightWidth: 2,
  },
  opponentLogs: {
    width: '50%',
    alignItems: 'center',
  },
  log: {
    color: 'white',
    fontSize: 30,
    paddingTop: 4,
  },
  lineThrough: {
    textDecorationLine: 'line-through',
    fontSize: 20,
  }
});
