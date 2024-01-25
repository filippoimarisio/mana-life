import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import PlayerMenu from './PlayerMenu';
import {Colors} from'./PlayerMenuColors';

export default function Player() {

  enum Operations {
    plus = 'plus',
    minus = 'minus'
  }

  const colorCodes = {
    mountain: 'rgb(235, 159, 130)',
    mountain_logo: 'rgb(211, 32, 42)',
    swamp: 'rgb(166,159,157)',
    swamp_logo: 'rgb(21,11,0)',
    forest: 'rgb(196,211,202)',
    forest_logo: 'rgb(0, 115, 62)',
    plains: 'rgb(248,231,185)',
    plains_logo: 'rgb(249, 250, 244)',
    island: 'rgb(179, 206, 234)',
    island_logo: 'rgb(14, 104, 171)',
  }

  type ValueOf<T> = T[keyof T];

  const [counter, setCounter] = useState(20);
  const [tempCounter, setTempCounter] = useState(0);
  const [showTempCounter, setShowTempCounter] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([])

  const handleOnSelectColor = (color: ValueOf<typeof Colors>) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(selectedColor=>selectedColor !== color))
      return
    }
    if (selectedColors.length < 3) setSelectedColors([...selectedColors, color])
    else return
  }

  const onBurgerMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const displayTempCounter = () => {
    setShowTempCounter(true)
    setTimeout(()=> {
      setShowTempCounter(false)
      setTempCounter(0)
    }, 3000)
  }

  const handleCounterInteraction = (operation: ValueOf<typeof Operations>) => {
    if (operation === Operations.plus) {
      setCounter(counter + 1)
      setTempCounter(tempCounter + 1)
    }
    if (operation === Operations.minus) {
      setCounter(counter - 1)
      setTempCounter(tempCounter - 1)
    }
    if (!showTempCounter) displayTempCounter()
  }

  const getBackgroundColor = (): string => {
    switch (selectedColors.length) {
      case 1: return colorCodes[selectedColors[0]]
      default: return colorCodes.plains
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: getBackgroundColor() }]}>
      <View style={[styles.tempCounterWrapper, isMenuOpen && styles.hide]}>
        <Text style={[styles.tempCounter, !showTempCounter && styles.hide]}>{tempCounter > 0 ? '+':''}{tempCounter}</Text>
      </View>
      <View style={[styles.container, styles.counter, isMenuOpen && styles.hide]}>
        <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.minus)} style={styles.counterButton}>
          <Image
            source={require('../assets/minus-circle-outline.png')}
            resizeMode = 'contain'
            style= {{
              height: 40,
              width: 40,
              tintColor: 'black'
            }}
          />
        </TouchableOpacity>
        <Text style={styles.counterAmount}>{counter}</Text>
        <TouchableOpacity onPress={()=>handleCounterInteraction(Operations.plus)} style={styles.counterButton}>
          <Image
            source={require('../assets/plus-circle-outline.png')}
            resizeMode = 'contain'
            style= {{
              height: 40,
              width: 40,
              tintColor: 'black'
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
    fontSize: 150
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
    fontSize: 30
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
