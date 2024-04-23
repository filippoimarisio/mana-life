import { StyleSheet, TouchableOpacity, View, Switch, Image } from 'react-native';
import React, {useContext, memo} from 'react';

const MainMenuSelection = ({setSelectedOption, showMainMenu, setShowMainMenu, elementsColor, darkMode, setDarkMode}) => {

  console.log('refresh')

  enum Options {
    reset = 'reset',
    dices = 'dices',
    legal = 'legal',
    manaCounter = "manaCounter",
    settings = "settings",
    lifeLogs = 'lifeLogs'
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)} style={{width: '10%'}} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/close.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: elementsColor}}/>
        </TouchableOpacity>
        <Image source={require(`../assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 100, width: 100}}/>
        <Switch
          trackColor={{false: 'gray', true: 'white'}}
          thumbColor={darkMode ? "#AFEEEE" : elementsColor}
          ios_backgroundColor="#AFEEEE"
          onValueChange={setDarkMode}
          value={darkMode}
          style={{width: '10%', transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
        />
      </View>
      <View style={[styles.options, {borderBottomWidth: 2, borderBottomColor: elementsColor}]}>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.reset)} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 40, width: 40, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.settings)} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/cog.png`)} resizeMode = 'contain' style= {{ height: 40, width: 40, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.dices)} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/dice-6-outline.png`)} resizeMode = 'contain' style= {{ height: 40, width: 40, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.lifeLogs)} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/heart-pulse.png`)} resizeMode = 'contain' style= {{ height: 40, width: 40, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.manaCounter)} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/bottle-tonic.png`)} resizeMode = 'contain' style= {{ height: 40, width: 40, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.legal)} activeOpacity={1} delayPressIn={0}>
          <Image source={require(`../assets/gavel.png`)} resizeMode = 'contain' style= {{ height: 40, width: 40, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
      </View>
    </View>
  )
}

export default memo(MainMenuSelection)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
  },
  initialLife: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  initialLifeValue: {
    fontSize: 30,
    color: 'gray',
  },
  initialLifeValueWrapper: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 10,
  },
  header: {
    height: '70%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  options: {
    height: '30%',
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10
  },
});
