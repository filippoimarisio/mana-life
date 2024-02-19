import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export default function MainMenu({resetPlayersLife, setShowMainMenu, showMainMenu}) {

  enum Options {
    dices = 'dices',
    startingLife = 'startingLife'
  }

  const [selectedOption, setSelectedOption] = useState('')

  const DiceImages = [
    require('../assets/dice-1-outline.png'),
    require('../assets/dice-2-outline.png'),
    require('../assets/dice-3-outline.png'),
    require('../assets/dice-4-outline.png'),
    require('../assets/dice-5-outline.png'),
    require('../assets/dice-6-outline.png')
  ];


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
        <TouchableOpacity onPress={rollDice}>
            <Image
                source={DiceImages[diceIndex]}
                resizeMode='contain'
                style={{ height: 200, width: 200, tintColor: 'white' }}
            />
        </TouchableOpacity>
        </View>
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)}>
          <Image source={require(`../assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 90, width: 90}}/>
        </TouchableOpacity>
      </View>
      <View style={[styles.options, {borderBottomWidth: 2}]}>
        <TouchableOpacity onPress={()=>resetPlayersLife()}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedOption(Options.dices)}>
          <Image source={require(`../assets/dice-6-outline.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>resetPlayersLife()}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>resetPlayersLife()}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {selectedOption === Options.dices && <DiceRoller />}
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  options: {
    height: '10%',
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'white',
  },
  content: {
    height: '70%'
  },
  dices: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
