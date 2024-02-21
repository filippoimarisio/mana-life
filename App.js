import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Player from './components/Player';
import MainMenu from './components/MainMenu';
import {Context} from './context'
import {Size} from './utils'

export default function App() {

  const [counterPlayerOne, setCounterPlayerOne] = useState(0)
  const [counterPlayerTwo, setCounterPlayerTwo] = useState(0)
  const [counterPlayerThree, setCounterPlayerThree] = useState(0)
  const [counterPlayerFour, setCounterPlayerFour] = useState(0)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [lifeLogsPlayerOne, setLifeLogsPlayerOne] = useState([])
  const [lifeLogsPlayerTwo, setLifeLogsPlayerTwo] = useState([])
  const [lifeLogsPlayerThree, setLifeLogsPlayerThree] = useState([])
  const [lifeLogsPlayerFour, setLifeLogsPlayerFour] = useState([])
  const [resetTrigger, setResetTrigger] = useState(false)
  const [initialLifeTotal, setInitialLifeTotal] = useState(20)
  const [darkMode, setDarkMode] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState('')
  const [elementsColor, setElementsColor] = useState('')
  const [playersNumber, setPlayersNumber] = useState(2)

  // Sets intial life totale
  useEffect(()=>{
    setInitialPlayersLife()
    setThemeColors
  }, [])

  const setThemeColors = () => {
    if (darkMode) {
      setBackgroundColor('rgba(40, 44, 53, 0.98)')
      setElementsColor('white')
    } else {
      setBackgroundColor('rgba(175, 238, 238, 0.98)')
      setElementsColor('#282C35')
    }
  }

  useEffect(()=>{
    setThemeColors()
  }, [darkMode])

  const setInitialPlayersLife = () => {
    setLifeLogsPlayerOne([initialLifeTotal])
    setLifeLogsPlayerTwo([initialLifeTotal])
    setCounterPlayerOne(initialLifeTotal)
    setCounterPlayerTwo(initialLifeTotal)
    setLifeLogsPlayerThree([initialLifeTotal])
    setLifeLogsPlayerFour([initialLifeTotal])
    setCounterPlayerThree(initialLifeTotal)
    setCounterPlayerFour(initialLifeTotal)
  }

  const resetPlayersLife = () => {
    setInitialPlayersLife()
    setResetTrigger(true)
    showMainMenu && setShowMainMenu(false)
  }

  const playersLifeLogs = () => {
    return [lifeLogsPlayerOne, lifeLogsPlayerTwo, lifeLogsPlayerThree, lifeLogsPlayerFour]
  }

  const PlayerOne = (size) => {
    return  (
      <Player 
        playerIndex={0} 
        lifeCounter={counterPlayerOne}
        setCounter={setCounterPlayerOne} 
        scaleSize={size}
        lifeLogs={playersLifeLogs()} 
        setLifeLogsPlayerOne={setLifeLogsPlayerOne}
      />
    )
  }
  const PlayerTwo = (size) => {
    return  (
      <Player 
        playerIndex={1} 
        lifeCounter={counterPlayerTwo} 
        setCounter={setCounterPlayerTwo} 
        scaleSize={size}
        lifeLogs={playersLifeLogs()} 
        setLifeLogs={setLifeLogsPlayerTwo}
      />
    )
  }
  const PlayerThree = (size) => {
    return  (
      <Player 
        playerIndex={2} 
        lifeCounter={counterPlayerThree} 
        setCounter={setCounterPlayerThree} 
        scaleSize={size}
        lifeLogs={playersLifeLogs()} 
        setLifeLogs={setLifeLogsPlayerThree}
      />
    )
  }
  const PlayerFour = (size) => {
    return  (
      <Player 
        playerIndex={3} 
        lifeCounter={counterPlayerFour} 
        setCounter={setCounterPlayerFour} 
        scaleSize={size}
        lifeLogs={playersLifeLogs()} 
        setLifeLogs={setLifeLogsPlayerFour}
      />
    )
  }
  
  const PlayersMosaic = () => {
    switch (playersNumber) {
      case 2 : return (
        <View style={styles.container}>
          <View style={[styles.playerContainer, styles.down, {borderTopWidth:1}]}>
            <PlayerTwo size={Size.big}/>
          </View>
          <View style={[styles.playerContainer, {borderTopWidth:1}]}>
            <PlayerOne size={Size.big}/>
          </View>
        </View>
      )
      case 3 : return (
        <View style={styles.container}>
          <View style={[styles.container, {transform: [{ rotate: '90deg'}, {scaleX: 1.05}]}]}>
            <View style={[styles.playerContainer, styles.down]}>
              <PlayerThree size={Size.small}/>
            </View>
            <View style={[styles.playerContainer,{borderTopWidth: 1}]}>
              <PlayerTwo size={Size.small}/>
            </View>
          </View>
          <View style={[styles.playerContainer, {borderTopWidth: 1}]}>
            <PlayerOne size={Size.big}/>
          </View>
        </View>
      )
      case 4 : return (
        <View style={styles.container}>
          <View style={[styles.container, {transform: [{ rotate: '90deg'}, {scaleX: 1.05}]}]}>
            <View style={[styles.playerContainer, styles.down, {borderLeftWidth: 0, borderTopWidth: 1}]}>
              <PlayerFour size={Size.small}/>
            </View>
            <View style={[styles.playerContainer, {borderRightWidth: 0, borderTopWidth: 1}]}>
              <PlayerThree size={Size.small}/>
            </View>
          </View>
          <View style={[styles.container, {transform: [{ rotate: '90deg'}, {scaleX: 1.05}]}]}>
            <View style={[styles.playerContainer, styles.down, {borderRightWidth: 1, borderTopWidth: 1,}]}>
              <PlayerTwo size={Size.small}/>
            </View>
            <View style={[styles.playerContainer, {borderLeftWidth: 1, borderTopWidth: 1,}]}>
              <PlayerOne size={Size.small}/>
            </View>
          </View>
        </View>
      )
      default: return (
        <View style={styles.container}>
          <View style={[styles.playerContainer, styles.down, {borderTopWidth:1}]}>
            <PlayerTwo size={Size.big}/>
          </View>
          <View style={[styles.playerContainer, {borderTopWidth:1}]}>
            <PlayerOne size={Size.big}/>
          </View>
        </View>
      )
    }
  }

  return (
    <Context.Provider value={[resetTrigger, setResetTrigger, backgroundColor, elementsColor]}>
      <View style={styles.container}>
        <PlayersMosaic />
        <View style={[styles.mainMenu, showMainMenu && styles.mainMenu__expanded, {backgroundColor: backgroundColor}]}>
          <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)} style={showMainMenu && styles.hide}>
            <Image source={require(`./assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30}}/>
          </TouchableOpacity>
          { showMainMenu && <MainMenu resetPlayersLife={resetPlayersLife} setShowMainMenu={setShowMainMenu} showMainMenu={showMainMenu} initialLifeTotal={initialLifeTotal} setInitialLifeTotal={setInitialLifeTotal} darkMode={darkMode} setDarkMode={setDarkMode}/>}
        </View>
      </View>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  playerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderColor: '#DAA520',
  },
  down: {
    transform: [{ rotate: '180deg'}]
  },
  left: {
    transform: [{ rotate: '90deg'}]
  },
  right: {
    transform: [{ rotate: '270deg'}]
  },
  mainMenu: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -23,
    marginTop: -23,
    borderColor:'#DAA520',
    borderWidth: 4,
    borderRadius: 30,
    padding: 4,
  },
  mainMenu__expanded: {
    top: 38,
    bottom: 0,
    right: 0,
    left: 0,
    marginLeft: 0,
    marginTop: 0,
    borderRadius: 0,
  },
  hide: {
    display: 'none'
  }
});
