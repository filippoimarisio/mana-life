import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Player from './components/Player';
import MainMenu from './components/MainMenu';

export const Context = React.createContext([])

export default function App() {

  const [lifeLogsPlayerOne, setLifeLogsPlayerOne] = useState([])
  const [lifeLogsPlayerTwo, setLifeLogsPlayerTwo] = useState([])
  const [counterPlayerOne, setCounterPlayerOne] = useState(0)
  const [counterPlayerTwo, setCounterPlayerTwo] = useState(0)
  const [resetTrigger, setResetTrigger] = useState(false)
  const [showMainMenu, setShowMainMenu] = useState(false)

  const initialLifeTotal = 20

  // Sets intial life total
  useEffect(()=>{
    setInitialPlayersLife()
  }, [])

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
    <Context.Provider value={[lifeLogsPlayerOne, setLifeLogsPlayerOne, lifeLogsPlayerTwo, setLifeLogsPlayerTwo, resetTrigger, setResetTrigger]}>
      <View style={styles.container}>
        <View style={[styles.playerContainer, styles.down]}>
          <Player playerIndex={0} lifeCounter={counterPlayerOne} setCounter={setCounterPlayerOne}/>
        </View>
        <View style={[styles.playerContainer]}>
          <Player playerIndex={1} lifeCounter={counterPlayerTwo} setCounter={setCounterPlayerTwo}/>
        </View>
        <View style={[styles.mainMenu, showMainMenu && styles.mainMenu__expanded]}>
          <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)} style={showMainMenu && styles.hide}>
            <Image source={require(`./assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30}}/>
          </TouchableOpacity>
          { showMainMenu && <MainMenu resetPlayersLife={resetPlayersLife} setShowMainMenu={setShowMainMenu} showMainMenu={showMainMenu}/>}
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
    position: 'relative',
    borderWidth: 1
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
    backgroundColor: '#AFEEEE'
  },
  mainMenu__expanded: {
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'background: rgba(0, 0, 0, 0.95)',
    marginLeft: 0,
    marginTop: 0,
  },
  hide: {
    display: 'none'
  }
});
