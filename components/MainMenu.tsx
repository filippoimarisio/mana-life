import { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ScrollView, Switch } from 'react-native';
import {privacyStatement} from '../utils'
import {Context} from '../context';
import PlayerMenuMana from './PlayerMenuMana'
import MainMenuLifeLogs from './MainMenuLifeLogs'
import MainMenuSettings from './MainMenuSettings'
import MainMenuSelection from './MainMenuSelection'

export default function MainMenu({resetPlayersLife, playersLifeLogs, onFullArtPlayerIndex, modifyManaCounter}) {

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
      <MainMenuSelection 
        setSelectedOption={setSelectedOption} 
        showMainMenu={showMainMenu} 
        setShowMainMenu={setShowMainMenu} 
        elementsColor={elementsColor} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode}
      />
      <View style={styles.content}>
        {selectedOption === Options.settings && <MainMenuSettings onFullArtPlayerIndex={onFullArtPlayerIndex}/>}
        {selectedOption === Options.reset && <Restart />}
        {selectedOption === Options.dices && <DiceRoller />}
        {selectedOption === Options.legal && <Legal />}
        {selectedOption === Options.manaCounter && <PlayerMenuMana modifyManaCounter={modifyManaCounter}/>}
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
