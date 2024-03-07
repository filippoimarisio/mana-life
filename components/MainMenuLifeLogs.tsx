import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React, {useContext, useEffect} from 'react';
import {Context} from '../context'

export default function MainMenuLifeLogs({playersLifeLogs}) {

  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor, playersNumber, setPlayersNumber, fullArtPlayerIndex, onFullArtPlayerIndex] = useContext(Context)

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.names, {borderBottomColor: elementsColor}]}>
          {[...Array(playersNumber)].map((players, playerIndex) => {
            return (
              <View style={[
                  styles.playerLogs,
                  playerIndex + 1 === [...Array(playersNumber)].length && styles.lastPlayer,
                  playersNumber === 2 && styles.twoPlayers, 
                  playersNumber === 3 && styles.threePlayers,
                  playersNumber === 4 && styles.fourPlayers, 
                  {borderRightColor: elementsColor}
                ]} key={playerIndex}>
                <Text key={playerIndex} style={[styles.playerBox, {color: elementsColor}]}>P{playerIndex + 1}</Text>
              </View>
            )
          })}
        </View>
        <ScrollView style={styles.logsWrapper}>
          <View style={styles.logs}>
            {[...Array(playersNumber)].map((players, playerIndex) => {
              return (
                <View style={[
                    styles.playerLogs, 
                    playerIndex + 1 === [...Array(playersNumber)].length && styles.lastPlayer,
                    playersNumber === 2 && styles.twoPlayers, 
                    playersNumber === 3 && styles.threePlayers,
                    playersNumber === 4 && styles.fourPlayers, 
                    {borderRightColor: elementsColor}
                  ]} key={playerIndex}>
                  {playersLifeLogs[playerIndex].map((log: number, logIndex: number) => {
                    return (
                      <Text key={logIndex} style={[styles.log, logIndex !== playersLifeLogs[playerIndex].length - 1 && styles.lineThrough, {color: elementsColor}]}>{log}</Text>
                    )
                  })}
                </View>
              )
            })}
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
    textAlign: 'center',
    fontSize: 30,
  },
  twoPlayers: {width: '50%'},
  threePlayers: {width: '33%'},
  fourPlayers: {width: '25%'},
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
  },
  lastPlayer: {
    borderRightWidth: 0
  }
});
