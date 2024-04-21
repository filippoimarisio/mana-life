import { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ScrollView, Switch } from 'react-native';
import {privacyStatement} from '../utils'
import {Context} from '../context';
import PlayerMenuMana from './PlayerMenuMana'
import MainMenuLifeLogs from './MainMenuLifeLogs'
import MainMenuSettings from './MainMenuSettings'

export default function MainMenu({resetPlayersLife, playersLifeLogs, onFullArtPlayerIndex}) {

  enum Options {
    reset = 'reset',
    dices = 'dices',
    legal = 'legal',
    manaCounter = "manaCounter",
    settings = "settings",
    lifeLogs = 'lifeLogs'
  }

  const [selectedOption, setSelectedOption] = useState(Options.reset)
  const {
    setShowMainMenu, 
    showMainMenu, 
    darkMode, 
    setDarkMode, 
    manaCounter,
    setManaCounter,
    elementsColor,
  } = useContext(Context) as any


  const Restart = () => {
    return (
    <View style={styles.reset}>
      <Text style={{color: elementsColor, fontSize: 25, marginBottom: '20%'}}>Start a new match?</Text>
      <TouchableOpacity onPress={()=>resetPlayersLife()} activeOpacity={1} delayPressIn={0}>
        <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: elementsColor}}/>
      </TouchableOpacity>
    </View>
    )
  }

  const DiceImages = [
    require('../assets/dice-1-outline.png'),
    require('../assets/dice-2-outline.png'),
    require('../assets/dice-3-outline.png'),
    require('../assets/dice-4-outline.png'),
    require('../assets/dice-5-outline.png'),
    require('../assets/dice-6-outline.png')
  ]

  const DiceRoller = () => {
    const [diceIndex, setDiceIndex] = useState(5);
    const rollDice = () => {
      let rollingInterval;
      let slowDownInterval = 100;
      const startTime = Date.now();

      const slowDownRoll = () => {
        rollingInterval = setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - startTime;
          const remainingTime = 2000 - elapsedTime;
          if (remainingTime <= 0) {
            clearInterval(rollingInterval);
            const randomIndex = Math.floor(Math.random() * DiceImages.length);
            setDiceIndex(randomIndex);
          } else {
            slowDownInterval += 10; // Increase interval for slowing down
            setDiceIndex(prevIndex => (prevIndex + 1) % DiceImages.length);
          }
        }, slowDownInterval);
      };

      slowDownRoll();

      setTimeout(() => {
        clearInterval(rollingInterval);
        slowDownRoll();
      }, 1000); // Start slowing down when 100ms before the end of timeout
    };

    return (
      <View style={styles.dices}>
        <TouchableOpacity onPress={rollDice} activeOpacity={1} delayPressIn={0}>
            <Image
                source={DiceImages[diceIndex]}
                resizeMode='contain'
                style={{ height: 200, width: 200, tintColor: elementsColor }}
            />
        </TouchableOpacity>
        </View>
    );
  }

  const Legal = () => {
    return (
      <ScrollView style={styles.legal}>
        <Text style={{color: elementsColor}}>{privacyStatement}</Text>
      </ScrollView>
    )
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
      
      <View style={styles.content}>
        {selectedOption === Options.settings && <MainMenuSettings onFullArtPlayerIndex={onFullArtPlayerIndex}/>}
        {selectedOption === Options.reset && <Restart />}
        {selectedOption === Options.dices && <DiceRoller />}
        {selectedOption === Options.legal && <Legal />}
        {selectedOption === Options.manaCounter && <PlayerMenuMana manaCounter={manaCounter} setManaCounter={setManaCounter}/>}
        {selectedOption === Options.lifeLogs && <MainMenuLifeLogs playersLifeLogs={playersLifeLogs}/>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
    margin: '5%'
  },
  header: {
    height: '20%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  options: {
    height: '10%',
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10
  },
  content: {
    height: '70%'
  },
  dices: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  legal: {
    height: '100%',
    maxHeight: '100%',
    overflow: 'scroll',
  },
  reset: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  showText: {
    fontSize: 20, textAlign:'center', textAlignVertical:'center', padding: 6, borderRadius: 6, borderWidth: 3,
  }
});
