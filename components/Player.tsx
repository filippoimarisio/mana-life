import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PlayerMenu from './PlayerMenu';
import {Mana} from'../utils';
import {LinearGradient} from 'expo-linear-gradient';
import {Context} from '../App';
import {colorCodes} from '../utils'

export enum Operations {
  plus = 'plus',
  minus = 'minus'
}

export default function Player({playerIndex, counter, setCounter}) {

  type ValueOf<T> = T[keyof T];

  const [tempCounter, setTempCounter] = useState(0);
  const [showTempCounter, setShowTempCounter] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([])
  const [counterTimeout, setCounterTimeout] = useState(null)

  const [lifeLogsPlayerOne, setLifeLogsPlayerOne, lifeLogsPlayerTwo, setLifeLogsPlayerTwo] = useContext(Context)

  const handleOnSelectColor = (color: ValueOf<typeof Mana>) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(selectedColor=>selectedColor !== color))
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

  const logs = playerIndex === 0 ? lifeLogsPlayerOne : lifeLogsPlayerTwo

  // Updates the current lifeTotal
  useEffect(() => {
    if (showTempCounter || tempCounter === 0) return
    if (playerIndex === 0) {
      setLifeLogsPlayerOne([...lifeLogsPlayerOne, counter])
    }
    if (playerIndex === 1) {
      setLifeLogsPlayerTwo([...lifeLogsPlayerTwo, counter])
    }
  }, [showTempCounter])

  useEffect(() => {
    if (tempCounter !== 0) setTempCounter(0)
  }, [logs])

  const handleCounterInteraction = (operation: ValueOf<typeof Operations>) => {
    if (operation === Operations.plus) {
      setCounter(counter + 1)
      setTempCounter(tempCounter + 1)
    }
    if (operation === Operations.minus) {
      setCounter(counter - 1)
      setTempCounter(tempCounter - 1)
    }
    displayTempCounter()
  }

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
      default: return [colorCodes.swamp_logo, colorCodes.mountain_logo]
    }
  }

  return (
    <View style={[styles.container]}>
      <LinearGradient
        style={[styles.container, {flex: 1}]}
        colors={[...getBackgroundColors()]}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
      >
        <View style={[styles.tempCounterWrapper, isMenuOpen && styles.hide]}>
          <Text style={[styles.tempCounter, !showTempCounter && styles.hide]}>{tempCounter > 0 ? '+':''}{tempCounter}</Text>
        </View>
        <View style={[styles.container, styles.counter, isMenuOpen && styles.hide]}>
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
          <Text style={styles.counterAmount}>{counter}</Text>
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
        <View style={[styles.playerMenu, isMenuOpen? styles.playerMenu_expanded : undefined]}>
          <PlayerMenu 
            onBurgerMenu={onBurgerMenu} 
            isMenuOpen={isMenuOpen}
            handleOnSelectColor={handleOnSelectColor}
            selectedColors={selectedColors}
            playerIndex={playerIndex}
          />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
  },
  counter: {
    flexDirection: 'row',
    marginBottom: 80,
  },
  hide: {
    display: 'none'
  },
  counterAmount: {
    fontSize: 150,
    color: 'white',
    shadowColor: 'black',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
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
    alignItems: 'flex-end',
  },
  tempCounter: {
    fontSize: 30,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  playerMenu: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  playerMenu_expanded: {
    top: 0,
    height: '100%',
  },
});
