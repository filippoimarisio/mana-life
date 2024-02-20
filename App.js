import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Player from './components/Player';
import MainMenu from './components/MainMenu';
import {Context} from './context'

export default function App() {

  const [counterPlayerOne, setCounterPlayerOne] = useState(0)
  const [counterPlayerTwo, setCounterPlayerTwo] = useState(0)
  const [showMainMenu, setShowMainMenu] = useState(false)
  const [lifeLogsPlayerOne, setLifeLogsPlayerOne] = useState([])
  const [lifeLogsPlayerTwo, setLifeLogsPlayerTwo] = useState([])
  const [resetTrigger, setResetTrigger] = useState(false)
  const [initialLifeTotal, setInitialLifeTotal] = useState(20)
  const [darkMode, setDarkMode] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState('')
  const [elementsColor, setElementsColor] = useState('')

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
  }

  const resetPlayersLife = () => {
    setInitialPlayersLife()
    setResetTrigger(true)
    showMainMenu && setShowMainMenu(false)
  }

  return (
    <Context.Provider value={[lifeLogsPlayerOne, setLifeLogsPlayerOne, lifeLogsPlayerTwo, setLifeLogsPlayerTwo, resetTrigger, setResetTrigger, backgroundColor, elementsColor]}>
      <View style={styles.container}>
      {/* <ImageBackground source={require('./assets/background-image.png')} resizeMode="cover"> */}
        <View style={[styles.playerContainer, styles.down]}>
          <Player playerIndex={0} lifeCounter={counterPlayerOne} setCounter={setCounterPlayerOne}/>
        </View>
        <View style={[styles.playerContainer]}>
          <Player playerIndex={1} lifeCounter={counterPlayerTwo} setCounter={setCounterPlayerTwo}/>
        </View>
        <View style={[styles.mainMenu, showMainMenu && styles.mainMenu__expanded, {backgroundColor: backgroundColor}]}>
          <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)} style={showMainMenu && styles.hide}>
            <Image source={require(`./assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30}}/>
          </TouchableOpacity>
          { showMainMenu && <MainMenu resetPlayersLife={resetPlayersLife} setShowMainMenu={setShowMainMenu} showMainMenu={showMainMenu} initialLifeTotal={initialLifeTotal} setInitialLifeTotal={setInitialLifeTotal} darkMode={darkMode} setDarkMode={setDarkMode}/>}
        </View>
      {/* </ImageBackground> */}
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
    position: 'relative',
  },
  playerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    borderTopColor: '#DAA520',
    borderTopWidth: 2,
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
    top: 0,
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
