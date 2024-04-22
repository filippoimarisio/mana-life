import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import PlayerMenu from './PlayerMenu';
import {Context} from '../context';
import {CounterTypes, Mana, Operations, fetchBackgroundImageKey, BackgroundImages, scaleSize, Size} from '../utils'

export default function Player({playerIndex, lifeCounter, setCounter, lifeLogs, setLifeLogs, size, selectedColors, setSelectedColors}) {


  type ValueOf<T> = T[keyof T];

  const [tempCounter, setTempCounter] = useState(0);
  const [showTempCounter, setShowTempCounter] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counterTimeout, setCounterTimeout] = useState(null)
  const [selectedCounterTypes, setSelectedCounterTypes] = useState([])
  const [currentCounterType, setCurrentCounterType] = useState(CounterTypes.life)
  const [poisonCounter, setPoisonCounter] = useState(0)
  const [edhCounter, setEdhCounter] = useState(0)
  const [stormCounter, setStormCounter] = useState(0)
  const [manaCounter, setManaCounter] = useState({
    mountain: 0,
    swamp: 0,
    forest: 0,
    plains: 0,
    island: 0,
    colorless: 0
  });
    
  const {resetTrigger, setResetTrigger, fullArtPlayerIndex} = useContext(Context) as any

  const handleOnSelectColor = (color: ValueOf<typeof Mana>) => {
    if ( selectedColors.includes(color)) {
      if (selectedColors.length>1) setSelectedColors(selectedColors.filter(selectedColor=>selectedColor !== color))
      return
    }
    if (selectedColors.length < 3) setSelectedColors([...selectedColors, color])
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
    setLifeLogs([...lifeLogs[playerIndex], lifeCounter])
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
    setSelectedColors([getRandomColor()])
  }, [])

  const getRandomColor = (): string => {
    const colors = ['mountain', 'plains', 'island', 'forest', 'swamp']
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
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
    const adjustedSize = scaleSize(30, size)
    switch (currentCounterType) {
      case CounterTypes.life: return <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: 'white'}}/>
      case CounterTypes.poison: return <Image source={require('../assets/poison-logo.png')} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: 'white'}}/>
      case CounterTypes.edh: return <Image source={require('../assets/edh-logo.png')} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: 'white'}}/>
      case CounterTypes.storm: return <Image source={require('../assets/storm-logo.png')} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: 'white'}}/>
      default: return <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: 'white'}}/>
    }
  }

  const counterMarginTop = (): any => {
    if (size === Size.small) {
      if (selectedCounterTypes.length === 0) return { marginTop: '-8%' }
      else return { marginTop: '8%' }
    }
    else {
      if (selectedCounterTypes.length === 0) return { marginTop: '0%' }
      else return { marginTop: '35%' }
    }
  }

  return (
      <View style={[styles.container]}>
        {selectedColors.length > 0 && fullArtPlayerIndex === null && <View style={styles.backgroundImage}>
          <ImageBackground source={BackgroundImages[fetchBackgroundImageKey(selectedColors)]} resizeMode="cover">
            <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0, 0.3)'}}>
            </View>
          </ImageBackground> 
        </View> }
          <View style={[styles.mainCounter, {...counterMarginTop()}]}>
            <View style={[styles.tempCounterWrapper, {height: 50, alignItems: size === Size.small ? 'flex-end':'flex-start', marginTop: selectedCounterTypes.length === 0 ? '10%' : 0}]}>
              {showTempCounter ? <Text style={[styles.tempCounter, !showTempCounter && styles.hide, {fontSize: scaleSize(30, size)}]}>{tempCounter > 0 ? '+':''}{tempCounter}</Text>:
              selectedCounterTypes.length > 0 && <View style={[styles.mainCounterLogo]}><MainCounterLogo /></View>}
            </View>
            <View style={[styles.lifeCounter]}>
              <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.minus)} style={styles.counterButton} delayPressIn={0}>
                <Image
                  source={require('../assets/minus-logo__white.png')}
                  resizeMode = 'contain'
                  style= {{
                    height: 40,
                    width: 40,
                  }}
                />
              </TouchableOpacity>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(150, size),lineHeight:scaleSize(150, size),}]}>{currentCounter()}</Text>
              <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.plus)} style={styles.counterButton} delayPressIn={0}>
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
              size={size}
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
    display: 'flex',
    alignItems:'center',
    marginBottom: '5%',
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
    color: 'white',
    shadowColor: 'black',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textAlignVertical: 'center',
    marginTop: '5%'
  },
  counterButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tempCounterWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempCounter: {
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
    display: 'flex',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
});
