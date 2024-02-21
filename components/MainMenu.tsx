import { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ScrollView, Switch } from 'react-native';
import {privacyStatement} from '../utils'
import {Context} from '../context';

export default function MainMenu({resetPlayersLife, setShowMainMenu, showMainMenu, setInitialLifeTotal, initialLifeTotal, darkMode, setDarkMode}) {

  enum Options {
    reset = 'reset',
    dices = 'dices',
    initialLife = 'initialLife',
    legal = 'legal'
  }

  const [selectedOption, setSelectedOption] = useState(Options.dices)
  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor] = useContext(Context)


  const Restart = () => {
    return (
    <View style={styles.reset}>
      <Text style={{color: elementsColor, fontSize: 25, marginBottom: '20%'}}>Restart a new match?</Text>
      <TouchableOpacity onPress={()=>resetPlayersLife()}>
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

  const InitialLife = () => {
    return (
      <View style={styles.initialLife}>
        <TouchableOpacity onPress={()=>setInitialLifeTotal(20)}>
          <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 20 && selectedValues]}>
            <Text style={[styles.initialLifeValue, initialLifeTotal === 20 && selectedValues]}>20</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setInitialLifeTotal(30)}>
          <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 30 && selectedValues]}>
            <Text style={[styles.initialLifeValue, initialLifeTotal === 30 && selectedValues]}>30</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setInitialLifeTotal(40)}>
          <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 40 && selectedValues]}>
            <Text style={[styles.initialLifeValue, initialLifeTotal === 40 && selectedValues]}>40</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const selectedValues = {
    borderColor: elementsColor,
    color: elementsColor
  }
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)} style={{width: '10%'}}>
          <Image source={require(`../assets/arrow-left.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: elementsColor}}/>
        </TouchableOpacity>
        <Image source={require(`../assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 90, width: 90}}/>
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
        <TouchableOpacity onPress={()=>setSelectedOption(Options.reset)}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedOption(Options.dices)}>
          <Image source={require(`../assets/dice-6-outline.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedOption(Options.initialLife)}>
          <Image source={require(`../assets/heart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setSelectedOption(Options.legal)}>
          <Image source={require(`../assets/gavel.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {selectedOption === Options.reset && <Restart />}
        {selectedOption === Options.dices && <DiceRoller />}
        {selectedOption === Options.legal && <Legal />}
        {selectedOption === Options.initialLife && <InitialLife />}
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
  initialLife: {
    height: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
  },
  initialLifeValue: {
    fontSize: 60,
    color: 'gray',
  },
  initialLifeValueWrapper: {
    padding: 5,
    width: 130,
    height: 130,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 20,
  }
});
