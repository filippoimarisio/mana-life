import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import PlayerMenu from './PlayerMenu';
import {Context} from '../context';
import {CounterTypes, Mana, Operations, colorCodes, fetchBackgroundImageKey, BackgroundImages} from '../utils'

export default function Player({playerIndex, lifeCounter, setCounter, scaleSize, lifeLogs, setLifeLogs}) {

  console.log(playerIndex, lifeCounter, setCounter, scaleSize, lifeLogs, setLifeLogs)

  type ValueOf<T> = T[keyof T];

  const [tempCounter, setTempCounter] = useState(0);
  const [showTempCounter, setShowTempCounter] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([])
  const [counterTimeout, setCounterTimeout] = useState(null)
  const [selectedCounterTypes, setSelectedCounterTypes] = useState([])
  const [currentCounterType, setCurrentCounterType] = useState(CounterTypes.life)
  const [poisonCounter, setPoisonCounter] = useState(0)
  const [edhCounter, setEdhCounter] = useState(0)
  const [stormCounter, setStormCounter] = useState(0)
    
  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor] = useContext(Context)

  const handleOnSelectColor = (color: ValueOf<typeof Mana>) => {
    if ( selectedColors.includes(color)) {
      if (selectedColors.length>1) setSelectedColors(selectedColors.filter(selectedColor=>selectedColor !== color))
      return
    }
    // Temporarly limited to two waiting to have triomes
    if (selectedColors.length < 2) setSelectedColors([...selectedColors, color])
    else return
  }

  const onBurgerMenu = () => {
    if (!isMenuOpen) setShowTempCounter(false)
    setIsMenuOpen(!isMenuOpen)
  }

  const displayTempCounter = () => {
    if (!showTempCounter) setShowTempCounter(true)
    if (counterTimeout) {
      clearTimeout(counterTimeout)
    }
    setCounterTimeout(setTimeout(() => {
      setShowTempCounter(false)
    }, 2000))
  }

  // Updates the current lifeTotal
  useEffect(() => {
    if (currentCounterType !== CounterTypes.life || showTempCounter || tempCounter === 0) return
    setLifeLogs([...[lifeLogs[playerIndex]], lifeCounter])
  }, [showTempCounter])

  useEffect(() => {
    if (tempCounter !== 0) setTempCounter(0)
  }, [lifeLogs[playerIndex]])

  // Resets the temp lifeCounter when changing lifeCounter type
  useEffect(() => {
    if (tempCounter !== 0) setTempCounter(0)
    if (showTempCounter) setShowTempCounter(false)
  }, [currentCounterType])

  // Resets all other counters
  useEffect(() => {
    if (resetTrigger) resetCounters()
    setResetTrigger(false)
  }, [resetTrigger])

  const resetCounters = () => {
    setPoisonCounter(0)
    setEdhCounter(0)
    setStormCounter(0)
    setCurrentCounterType(CounterTypes.life)
  }

  const handleCounterInteraction = (operation: ValueOf<typeof Operations>) => {
    const increment = operation === Operations.plus ? 1 : -1
    updateCorrectCounter(operation)
    setTempCounter(tempCounter + increment)
    displayTempCounter()
  }

  const updateCorrectCounter = (operation: ValueOf<typeof Operations>) => {
    const increment = operation === Operations.plus ? 1 : -1

    switch (currentCounterType) {
      case CounterTypes.life: {
        setCounter(lifeCounter + increment)
        return 
      }
      case CounterTypes.poison: {
        setPoisonCounter(poisonCounter + increment)
        return 
      }
      case CounterTypes.edh: {
        setEdhCounter(edhCounter + increment)
        return 
      }
      case CounterTypes.storm: {
        setStormCounter(stormCounter + increment)
        return 
      }
      default: {
        return
      }
    }
  }

  // Assigns random colors on load and handles selected ones
  useEffect(() => {
    const startingColors = getDefaultBackgroundColors()
    setSelectedColors(startingColors)
  }, [])

  const getColorCode = (color: string): string => {
    if (color === 'mountain') return colorCodes.mountain_logo
    if (color === 'plains') return colorCodes.plains
    if (color === 'island') return colorCodes.island_logo
    if (color === 'forest') return colorCodes.forest_logo
    if (color === 'swamp') return colorCodes.swamp_logo
    return colorCodes.plains_logo
  }

  const getBackgroundColors = (): string[] => {
    switch (selectedColors.length) {
      case 1: return [getColorCode(selectedColors[0]), getColorCode(selectedColors[0])]
      case 2: return [getColorCode(selectedColors[0]), getColorCode(selectedColors[1])]
      case 3: return [getColorCode(selectedColors[0]), getColorCode(selectedColors[1]), getColorCode(selectedColors[2])]
      default: return [colorCodes.forest_logo, colorCodes.forest_logo]
    }
  }

  const getRandomColor = (excludeColors: string[] = []): string => {
    const colors = ['mountain', 'plains', 'island', 'forest', 'swamp']
    const availableColors = colors.filter(color => !excludeColors.includes(color));
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
};

// Temporirly commented out to test background images as triomes are missing
const getDefaultBackgroundColors = (): string[] => {
    let selectedColors: string[];
    // const numColors = Math.floor(Math.random() * 2) + 2
    const numColors = 2
    selectedColors = [getRandomColor(), getRandomColor()];
    // if (numColors === 3) {
    //     selectedColors = []
    //     selectedColors.push(getRandomColor());
    //     selectedColors.push(getRandomColor([selectedColors[0]]));
    //     selectedColors.push(getRandomColor([selectedColors[0], selectedColors[1]]));
    // } else {
    //     selectedColors = [getRandomColor(), getRandomColor()];
    // }
    return selectedColors;
};

  const currentCounter = () => {
    switch (currentCounterType) {
      case CounterTypes.life: return lifeCounter
      case CounterTypes.poison: return poisonCounter
      case CounterTypes.edh: return edhCounter
      case CounterTypes.storm: return stormCounter
      default: return lifeCounter
    }
  }

  const MainCounterLogo = () => {
    switch (currentCounterType) {
      case CounterTypes.life: return <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: 'white'}}/>
      case CounterTypes.poison: return <Image source={require('../assets/poison-logo.png')} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: 'white'}}/>
      case CounterTypes.edh: return <Image source={require('../assets/edh-logo.png')} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: 'white'}}/>
      case CounterTypes.storm: return <Image source={require('../assets/storm-logo.png')} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: 'white'}}/>
      default: return <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: 'white'}}/>
    }
  }

  return (
      <View style={[styles.container]}>
        {selectedColors.length > 0 && <View style={styles.backgroundImage}>
          <ImageBackground source={BackgroundImages[fetchBackgroundImageKey(selectedColors)]} resizeMode="cover">
            <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.6)'}}>
            </View>
          </ImageBackground> 
        </View> }
          <View style={styles.mainCounter}>
            <View style={[styles.mainCounterLogo]}>
              <MainCounterLogo />
            </View>
            <View style={[styles.lifeCounter]}>
              <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.minus)} style={styles.counterButton}>
                <Image
                  source={require('../assets/minus-logo__white.png')}
                  resizeMode = 'contain'
                  style= {{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
              <Text style={styles.counterAmount}>{currentCounter()}</Text>
              <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.plus)} style={styles.counterButton}>
                <Image
                  source={require('../assets/plus-logo__white.png')}
                  resizeMode = 'contain'
                  style= {{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.tempCounterWrapper]}>
              <Text style={[styles.tempCounter, !showTempCounter && styles.hide]}>{tempCounter > 0 ? '+':''}{tempCounter}</Text>
            </View>
          </View>
          <View style={[styles.playerMenu, isMenuOpen? styles.playerMenu_expanded : undefined]}>
            <PlayerMenu 
              onBurgerMenu={onBurgerMenu} 
              isMenuOpen={isMenuOpen}
              handleOnSelectColor={handleOnSelectColor}
              selectedColors={selectedColors}
              playerIndex={playerIndex}
              poisonCounter={poisonCounter}
              edhCounter={edhCounter}
              stormCounter={stormCounter}
              lifeCounter={lifeCounter}
              setCurrentCounterType={setCurrentCounterType}
              currentCounterType={currentCounterType}
              selectedCounterTypes={selectedCounterTypes}
              setSelectedCounterTypes={setSelectedCounterTypes}
              lifeLogs={lifeLogs} 
            />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  mainCounter: {
    marginTop: '5%',
    marginBottom: '5%',
    display: 'flex',
    alignItems:'center',
  },
  lifeCounter: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  hide: {
    display: 'none'
  },
  counterAmount: {
    fontSize: 50,
    color: 'white',
    shadowColor: 'black',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  counterButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tempCounterWrapper: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'flex-start',
  },
  tempCounter: {
    fontSize: 30,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    width:100,
    textAlign: 'center',
  },
  playerMenu: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  playerMenu_expanded: {
    bottom: 0,
  },
  mainCounterLogo: {
    marginBottom: '-5%'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
});
