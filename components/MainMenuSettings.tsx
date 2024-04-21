import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React, {useContext} from 'react';
import {Context} from '../context'
import MainMenuFullArtSelector from './MainMenuFullArtSelector'
import MainMenuTimerSettings from './MainMenuTimerSettings'
import MainMenuInitialLife from './MainMenuInitialLife'
import MainMenuNumberOfPlayers from './MainMenuNumberOfPlayers'

export default function MainMenuSettings({onFullArtPlayerIndex}) {

  const {elementsColor} = useContext(Context) as any

  return (
    <View style={styles.settings}>
      <View style={styles.settings_labels}>
        <View style={styles.settings_elementWrapper}><Text style={[styles.settings_label,{color: elementsColor}]}>Players</Text></View>
        <View style={styles.settings_elementWrapper}><Text style={[styles.settings_label,{color: elementsColor}]}>Life</Text></View>
        <View style={styles.settings_elementWrapper}><Text style={[styles.settings_label,{color: elementsColor}]}>Timer</Text></View>
        <View style={styles.settings_elementWrapper}><Text style={[styles.settings_label,{color: elementsColor}]}>Full art</Text></View>
      </View>
      <View style={styles.settings_content}>
        <View style={styles.settings_elementWrapper}><MainMenuNumberOfPlayers /></View>
        <View style={styles.settings_elementWrapper}><MainMenuInitialLife /></View>
        <View style={styles.settings_elementWrapper}><MainMenuTimerSettings /></View>
        <View style={[styles.settings_elementWrapper]}>
          <View style={styles.settings_fullArtSelector}>
            <MainMenuFullArtSelector onFullArtPlayerIndex={onFullArtPlayerIndex}/>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  settings: {
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'row'
  },
  settings_labels: {
    width: '35%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  settings_elementWrapper: {
    flex: 1,
    alignItems:'flex-start',
    justifyContent: 'center'
  },
  settings_label: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  settings_content: {
    width: '65%',
  },
  settings_fullArtSelector: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
});
