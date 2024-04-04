import React, {useState, useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Player from './components/Player';
import MainMenu from './components/MainMenu';
import {Context} from './context'
import {Size, BackgroundImages, fetchBackgroundImageKey} from './utils'
import MainMenuTimer from './components/MainMenuTimer'

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
  const [selectedColorsPlayerOne, setSelectedColorsPlayerOne] = useState([])
  const [selectedColorsPlayerTwo, setSelectedColorsPlayerTwo] = useState([])
  const [selectedColorsPlayerThree, setSelectedColorsPlayerThree] = useState([])
  const [selectedColorsPlayerFour, setSelectedColorsPlayerFour] = useState([])
  const [resetTrigger, setResetTrigger] = useState(false)
  const [initialLifeTotal, setInitialLifeTotal] = useState(20)
  const [darkMode, setDarkMode] = useState(true)
  const [backgroundColor, setBackgroundColor] = useState('')
  const [elementsColor, setElementsColor] = useState('')
  const [playersNumber, setPlayersNumber] = useState(2)
  const [fullArtPlayerIndex, setFullArtPlayerIndex] = useState(null)
  const [manaCounter, setManaCounter] = useState({
    mountain: 0,
    swamp: 0,
    forest: 0,
    plains: 0,
    island: 0,
    colorless: 0
  });
  const [time, setTime] = useState({ minutes: 50, seconds: 0 });
  const [timerOn, setTimerOn] = useState(false);
  const [showTimer, setShowTimer] = useState(false)

  // Sets intial life totale
  useEffect(()=>{
    setInitialPlayersLife()
    setThemeColors
  }, [])

  useEffect(()=>{
    setInitialPlayersLife()
    setFullArtPlayerIndex(null)
  }, [playersNumber])

  const setThemeColors = () => {
    if (darkMode) {
      setBackgroundColor('rgba(40, 44, 53, 0.99)')
      setElementsColor('white')
    } else {
      setBackgroundColor('rgba(178, 255, 255, 0.99)')
      setElementsColor('#282C35')
    }
  }

  useEffect(()=>{
    setThemeColors()
  }, [darkMode])
  

  const setInitialPlayersLife = () => {
    setLifeLogsPlayerOne([initialLifeTotal])
    setLifeLogsPlayerTwo([initialLifeTotal])
    setLifeLogsPlayerThree([initialLifeTotal])
    setLifeLogsPlayerFour([initialLifeTotal])
    setCounterPlayerOne(initialLifeTotal)
    setCounterPlayerTwo(initialLifeTotal)
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

  const onFullArtPlayerIndex = index => {
    if (fullArtPlayerIndex === index) setFullArtPlayerIndex(null)
    else setFullArtPlayerIndex(index)
  }

  const getChosenPlayersSelectedColors = () => {
    if (fullArtPlayerIndex === 0) return selectedColorsPlayerOne
    if (fullArtPlayerIndex === 1) return selectedColorsPlayerTwo
    if (fullArtPlayerIndex === 2) return selectedColorsPlayerThree
    if (fullArtPlayerIndex === 3) return selectedColorsPlayerFour
  }

  return (
    <Context.Provider value={[resetTrigger, setResetTrigger, backgroundColor, elementsColor, playersNumber, setPlayersNumber, fullArtPlayerIndex, onFullArtPlayerIndex]}>
      <View style={[styles.container, {backgroundColor: 'black'}]}>
        <View style={{marginTop:'6%', position: 'relative', width: '100%', height: '94%'}}>
          {fullArtPlayerIndex !==null && <View style={styles.backgroundImage}>
            <ImageBackground source={BackgroundImages[fetchBackgroundImageKey(getChosenPlayersSelectedColors())]} resizeMode="cover">
              <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.3)'}}></View>
            </ImageBackground> 
          </View> }
          {playersNumber === 2 && 
            <View style={styles.container}>
              <View style={[styles.playerContainer, styles.down, {borderTopWidth:2}]}>
                <Player 
                  playerIndex={1} 
                  lifeCounter={counterPlayerTwo} 
                  setCounter={setCounterPlayerTwo} 
                  size={Size.medium}
                  lifeLogs={playersLifeLogs()} 
                  setLifeLogs={setLifeLogsPlayerTwo}
                  setSelectedColors={setSelectedColorsPlayerTwo}
                  selectedColors={selectedColorsPlayerTwo}
                />
              </View>
              <View style={[styles.playerContainer, {borderTopWidth:2}]}>
              <Player 
                playerIndex={0} 
                lifeCounter={counterPlayerOne}
                setCounter={setCounterPlayerOne} 
                size={Size.medium}
                lifeLogs={playersLifeLogs()} 
                setLifeLogs={setLifeLogsPlayerOne}
                setSelectedColors={setSelectedColorsPlayerOne}
                selectedColors={selectedColorsPlayerOne}
              />
              </View>
            </View>
          }
          {playersNumber === 3 && 
            <View style={styles.container}>
              <View style={[styles.container, {transform: [{ rotate: '90deg'}]}]}>
                <View style={[styles.playerContainer, styles.down]}>
                  <Player 
                    playerIndex={2} 
                    lifeCounter={counterPlayerThree} 
                    setCounter={setCounterPlayerThree} 
                    size={Size.small}
                    lifeLogs={playersLifeLogs()} 
                    setLifeLogs={setLifeLogsPlayerThree}
                    setSelectedColors={setSelectedColorsPlayerThree}
                    selectedColors={selectedColorsPlayerThree}
                  />
                </View>
                <View style={[styles.playerContainer,{borderTopWidth: 2}]}>
                  <Player 
                    playerIndex={1} 
                    lifeCounter={counterPlayerTwo} 
                    setCounter={setCounterPlayerTwo} 
                    size={Size.small}
                    lifeLogs={playersLifeLogs()} 
                    setLifeLogs={setLifeLogsPlayerTwo}
                    setSelectedColors={setSelectedColorsPlayerTwo}
                    selectedColors={selectedColorsPlayerTwo}
                  />
                </View>
              </View>
              <View style={[styles.playerContainer, {borderTopWidth: 2}]}>
                <Player 
                  playerIndex={0} 
                  lifeCounter={counterPlayerOne}
                  setCounter={setCounterPlayerOne} 
                  size={Size.medium}
                  lifeLogs={playersLifeLogs()} 
                  setLifeLogs={setLifeLogsPlayerOne}
                  setSelectedColors={setSelectedColorsPlayerOne}
                  selectedColors={selectedColorsPlayerOne}
                />
              </View>
            </View>
          } 
          {playersNumber === 4 && 
          <View style={styles.container}>
            <View style={[styles.container, {transform: [{ rotate: '90deg'}, ]}]}>
              <View style={[styles.playerContainer, styles.down, {borderLeftWidth: 2, borderTopWidth: 2}]}>
                <Player 
                  playerIndex={3} 
                  lifeCounter={counterPlayerFour} 
                  setCounter={setCounterPlayerFour} 
                  size={Size.small}
                  lifeLogs={playersLifeLogs()} 
                  setLifeLogs={setLifeLogsPlayerFour}
                  setSelectedColors={setSelectedColorsPlayerFour}
                  selectedColors={selectedColorsPlayerFour}
                />
              </View>
              <View style={[styles.playerContainer, {borderRightWidth: 2, borderTopWidth: 2}]}>
                <Player 
                  playerIndex={2} 
                  lifeCounter={counterPlayerThree} 
                  setCounter={setCounterPlayerThree} 
                  size={Size.small}
                  lifeLogs={playersLifeLogs()} 
                  setLifeLogs={setLifeLogsPlayerThree}
                  setSelectedColors={setSelectedColorsPlayerThree}
                  selectedColors={selectedColorsPlayerThree}
                />
              </View>
            </View>
            <View style={[styles.container, {transform: [{ rotate: '90deg'}, ]}]}>
              <View style={[styles.playerContainer, styles.down, {borderRightWidth: 2, borderTopWidth: 2,}]}>
                <Player 
                  playerIndex={1} 
                  lifeCounter={counterPlayerTwo} 
                  setCounter={setCounterPlayerTwo} 
                  size={Size.small}
                  lifeLogs={playersLifeLogs()} 
                  setLifeLogs={setLifeLogsPlayerTwo}
                  setSelectedColors={setSelectedColorsPlayerTwo}
                  selectedColors={selectedColorsPlayerTwo}
                />
              </View>
              <View style={[styles.playerContainer, {borderLeftWidth: 2, borderTopWidth: 2,}]}>
                <Player 
                  playerIndex={0} 
                  lifeCounter={counterPlayerOne}
                  setCounter={setCounterPlayerOne} 
                  size={Size.small}
                  lifeLogs={playersLifeLogs()} 
                  setLifeLogs={setLifeLogsPlayerOne}
                  setSelectedColors={setSelectedColorsPlayerOne}
                  selectedColors={selectedColorsPlayerOne}
                />
              </View>
            </View>
          </View>
          }
          <View style={[styles.mainMenu, showMainMenu && styles.mainMenu__expanded, {backgroundColor: backgroundColor}]}>
            <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)} style={showMainMenu && styles.hide}>
              <Image source={require(`./assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30}}/>
            </TouchableOpacity>
            { showMainMenu && 
              <MainMenu
                resetPlayersLife={resetPlayersLife} 
                setShowMainMenu={setShowMainMenu} 
                showMainMenu={showMainMenu} 
                initialLifeTotal={initialLifeTotal} 
                setInitialLifeTotal={setInitialLifeTotal} 
                darkMode={darkMode} 
                playersLifeLogs={playersLifeLogs()}
                manaCounter={manaCounter}
                setManaCounter={setManaCounter}
                time={time} 
                setTime={setTime}
                showTimer={showTimer} 
                setShowTimer={setShowTimer}
                setDarkMode={setDarkMode}/>}
          </View>
          <View style={[styles.timer, !showMainMenu && showTimer && styles.show]}>
            <MainMenuTimer 
              time={time} 
              setTime={setTime}
              timerOn={timerOn}
              setTimerOn={setTimerOn}
            />
          </View>
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
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 0,
  },
  timer: {
    transform: [{ rotate: '270deg'}],
    position: 'absolute',
    top: '50%',
    marginTop: -30,
    left: -14,
    display: 'none'
  },
  show: {
    display: 'flex'
  }
});
