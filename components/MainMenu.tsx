import { useState, useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, ScrollView, Switch } from 'react-native';
import {privacyStatement} from '../utils'
import {Context} from '../context';
import MainMenuNumberOfPlayers from './MainMenuNumberOfPlayers'
import PlayerMenuMana from './PlayerMenuMana'

export default function MainMenu({resetPlayersLife, setShowMainMenu, showMainMenu, setInitialLifeTotal, initialLifeTotal, darkMode, setDarkMode}) {

  enum Options {
    reset = 'reset',
    dices = 'dices',
    initialLife = 'initialLife',
    numberOfPlayers = 'numberOfPlayers',
    legal = 'legal',
    manaCounter = "manaCounter",
    settings = "settings"
  }

  const [selectedOption, setSelectedOption] = useState(Options.settings)
  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor, playersNumber, setPlayersNumber, fullArtPlayerIndex, onFullArtPlayerIndex] = useContext(Context)

  const selectedValues = {
    borderColor: elementsColor,
    color: elementsColor
  }

  const Restart = () => {
    return (
    <View style={styles.reset}>
      <Text style={{color: elementsColor, fontSize: 25, marginBottom: '20%'}}>Start a new match?</Text>
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
        <TouchableOpacity onPress={()=>setInitialLifeTotal(20)} activeOpacity={1} delayPressIn={0}>
          <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 20 && selectedValues]}>
            <Text style={[styles.initialLifeValue, initialLifeTotal === 20 && selectedValues]}>20</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setInitialLifeTotal(30)} activeOpacity={1} delayPressIn={0}>
          <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 30 && selectedValues]}>
            <Text style={[styles.initialLifeValue, initialLifeTotal === 30 && selectedValues]}>30</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setInitialLifeTotal(40)} activeOpacity={1} delayPressIn={0}>
          <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 40 && selectedValues]}>
            <Text style={[styles.initialLifeValue, initialLifeTotal === 40 && selectedValues]}>40</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  const FullArtSelector = (): any => {
    return ([...Array(playersNumber)].map((e, i) => {
      return <View key={i} style={[styles.playerArtElement__wrapper]}>
              <TouchableOpacity onPress={()=>onFullArtPlayerIndex(i)} style={[styles.playerArtElement, fullArtPlayerIndex === i && selectedValues]} activeOpacity={1} delayPressIn={0}>
                <Text style={[styles.playerArtElement_text, fullArtPlayerIndex === i && selectedValues]}>P{i + 1}</Text>
              </TouchableOpacity>
            </View>
    }))
  }

  const Settings = () => {
    return (
      <View style={styles.settings}>
        <View style={styles.settings_labels}>
          <View style={styles.settings_elementWrapper}><Text style={[styles.settings_label,{color: elementsColor}]}>Players:</Text></View>
          <View style={styles.settings_elementWrapper}><Text style={[styles.settings_label,{color: elementsColor}]}>Full art:</Text></View>
          <View style={styles.settings_elementWrapper}><Text style={[styles.settings_label,{color: elementsColor}]}>Life:</Text></View>
        </View>
        <View style={styles.settings_content}>
          <View style={styles.settings_elementWrapper}><MainMenuNumberOfPlayers /></View>
          <View style={[styles.settings_elementWrapper]}>
            <View style={styles.settings_fullArtSelector}><FullArtSelector /></View>
          </View>
          <View style={styles.settings_elementWrapper}><InitialLife /></View>
        </View>
      </View>
    )
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
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.settings)}>
          <Image source={require(`../assets/cog.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.reset)}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.dices)}>
          <Image source={require(`../assets/dice-6-outline.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.manaCounter)}>
          <Image source={require(`../assets/bottle-tonic.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
        <View style={{flex: 1, alignItems:'center'}}><TouchableOpacity onPress={()=>setSelectedOption(Options.legal)}>
          <Image source={require(`../assets/gavel.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: elementsColor}}/>
        </TouchableOpacity></View>
      </View>
      
      <View style={styles.content}>
        {selectedOption === Options.settings && <Settings />}
        {selectedOption === Options.reset && <Restart />}
        {selectedOption === Options.dices && <DiceRoller />}
        {selectedOption === Options.legal && <Legal />}
        {selectedOption === Options.initialLife && <InitialLife />}
        {selectedOption === Options.numberOfPlayers && <MainMenuNumberOfPlayers />}
        {selectedOption === Options.manaCounter && <PlayerMenuMana />}
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
  playerArtElement__wrapper: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerArtElement: {
    borderWidth: 3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderRadius: 10,
    marginRight: 20,
    height: 40,
    width: 40
  },
  playerArtElement_text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  }
});
