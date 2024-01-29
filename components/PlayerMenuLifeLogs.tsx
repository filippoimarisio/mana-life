import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React, {useState, useEffect} from 'react';

export default function PlayerMenuLifeLogs({tempCounterLogs}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.names}>
          <Text style={styles.playerBox}>Me</Text>
          <Text style={styles.opponentBox}>You</Text>
        </View>
        <ScrollView style={styles.logs}>
          <View style={styles.playerLogs}>
            {tempCounterLogs.map((log: number, logIndex: number) => {
              return (
                <Text key={logIndex} style={[styles.log, logIndex !== tempCounterLogs.length - 1 && styles.lineThrough]}>{log}</Text>
              )
            })}
          </View>
          <View></View>
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
    height: '80%'
  },
  names: {
    height: 50,
    flexDirection: 'row',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
  logs: {
    width: '100%',
    maxHeight: '100%',
    height: '100%',
    overflow: 'scroll'
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
  playerLogs: {
    minHeight: '100%',
    width: '50%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRightColor: 'white',
    borderRightWidth: 2,
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
