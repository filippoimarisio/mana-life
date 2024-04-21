import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import React, {useState, useContext} from 'react';
import PlayerMenuColors from './PlayerMenuColors';
import PlayerMenuLifeLogs from './PlayerMenuLifeLogs';
import PlayerMenuMana from './PlayerMenuMana';
import {CounterTypes, scaleSize, Size} from '../utils'
import PlayerMenuCounters from './PlayerMenuCounters'
import {Context} from '../context';

export default function PlayerMenu({
  onBurgerMenu, 
  isMenuOpen, 
  handleOnSelectColor, 
  selectedColors, 
  playerIndex, 
  poisonCounter, 
  edhCounter, 
  stormCounter, 
  lifeCounter, 
  setCurrentCounterType, 
  currentCounterType, 
  selectedCounterTypes, 
  setSelectedCounterTypes, 
  lifeLogs, 
  size, 
  manaCounter, 
  setManaCounter
}) {

  const [selectedMenu, setSelectedMenu] = useState("");
  const {backgroundColor, elementsColor, playersNumber} = useContext(Context) as any

  enum MenuItemsEnum {
    colorSelection = 'colorSelection',
    lifeLogs = 'lifeLogs',
    manaCount = 'manaCount',
    counterTypes = 'counterTypes'
  }

  type ValueOf<T> = T[keyof T];

  function handleMenuSelection(menuName: ValueOf<typeof MenuItemsEnum>): void {
    setSelectedMenu(menuName)
  }

  const handleOnBurgerMenu = () => {
    onBurgerMenu()
    if (isMenuOpen) setSelectedMenu('')
  }

  function MenuItems() {
    const adjustedSize = scaleSize(80, size)
    return (
      <View style={[styles.menuItems__wrapper,{width: size === Size.medium ?'100%': '60%'}]}>
        <View style={[styles.menuItems_row,{height: playersNumber > 2 ? '100%' : '50%'}]}>
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.colorSelection)} activeOpacity={1} delayPressIn={0}>
            <Image source={require(`../assets/palette.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: elementsColor || 'white'}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.counterTypes)} activeOpacity={1} delayPressIn={0}>
            <Image source={require('../assets/counter-types-logo.png')} resizeMode = 'contain' style= {{ height: 90, width: 90, tintColor: elementsColor || 'white'}}/>
          </TouchableOpacity> 
        </View>
        { playersNumber < 3 && <View style={[styles.menuItems_row]}>
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.manaCount)} activeOpacity={1} delayPressIn={0}>
            <Image source={require(`../assets/bottle-tonic.png`)} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: elementsColor || 'white'}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.lifeLogs)} activeOpacity={1} delayPressIn={0}>
            <Image source={require(`../assets/heart-pulse.png`)} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: elementsColor || 'white'}}/>
          </TouchableOpacity> 
        </View>}
      </View>
    )
  }

  function MenuItemWrapper() {
    return (
      <View style={[styles.menuItem, {width: size === Size.medium ?'100%': '60%',}]}>
        { selectedMenu === MenuItemsEnum.colorSelection && <PlayerMenuColors handleOnSelectColor={handleOnSelectColor} selectedColors={selectedColors} size={size}/>}
        { selectedMenu === MenuItemsEnum.lifeLogs && <PlayerMenuLifeLogs playerIndex={playerIndex} lifeLogs={lifeLogs}/>}
        { selectedMenu === MenuItemsEnum.manaCount && <PlayerMenuMana manaCounter={manaCounter} setManaCounter={setManaCounter}/> }
        { selectedMenu === MenuItemsEnum.counterTypes && <PlayerMenuCounters selectedCounterTypes={selectedCounterTypes} setSelectedCounterTypes={setSelectedCounterTypes} size={size}/> }
      </View>
    )
  }

  const onSelectCurrentCounterType = (counterType: ValueOf<typeof CounterTypes>): void => {
    if (currentCounterType !== counterType) setCurrentCounterType(counterType)
  }

  const tintColor = (): string => {
    return isMenuOpen ? elementsColor : 'white'
  }

  const tintBackgroundColor = (counterType: ValueOf<typeof CounterTypes>): string => {
    return currentCounterType.includes(counterType) && !isMenuOpen ? 'rgba(255,255,255, 0.3)' : 'transparent'
  }

  const onBackArrow = () => {
    setSelectedMenu('')
  }

  const getPlayerIcon = () => {
    if (isMenuOpen) return require('../assets/close.png')
    switch (playerIndex) {
      case 0: return require('../assets/p1-logo.png')
      case 1: return require('../assets/p2-logo.png')
      case 2: return require('../assets/p3-logo.png')
      case 3: return require('../assets/p4-logo.png')
      default: return require('../assets/burger-menu__white.png')
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { backgroundColor : isMenuOpen ? backgroundColor : undefined, padding: scaleSize(20, size)}]}>
        <View style={[styles.navbar, {marginTop: scaleSize(30, size)}]}>
          { selectedMenu ?<View style={{paddingRight: scaleSize(10, size)}}><TouchableOpacity onPress={()=> onBackArrow()} style={styles.backArrow} activeOpacity={1} delayPressIn={0}>
            <Image
              source={require('../assets/arrow-left.png')}
              resizeMode = 'contain'
              style= {{
                height: 40,
                width: 40,
                tintColor: elementsColor
              }}
            />
          </TouchableOpacity></View> : <View style={{height: scaleSize(40, size), width: scaleSize(40, size), paddingRight: scaleSize(10, size)}}></View> }
          { selectedCounterTypes.length > 0 && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.life)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide, {borderLeftColor: elementsColor, borderLeftWidth: 1, borderRightColor: elementsColor}]} activeOpacity={1} delayPressIn={0}>
            <View style={[styles.counter, {backgroundColor: tintBackgroundColor(CounterTypes.life)}]}>
              <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor()}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor()}]}>{lifeCounter}</Text>
            </View>
          </TouchableOpacity> }
          { selectedCounterTypes.includes(CounterTypes.poison) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.poison)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide, {borderRightColor: elementsColor}]} activeOpacity={1} delayPressIn={0}>
            <View style={[styles.counter, {backgroundColor: tintBackgroundColor(CounterTypes.poison)}]}>
              <Image source={require('../assets/poison-logo.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor()}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor()}]}>{poisonCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.edh) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.edh)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide, {borderRightColor: elementsColor}]} activeOpacity={1} delayPressIn={0}>
            <View style={[styles.counter, {backgroundColor: tintBackgroundColor(CounterTypes.edh)}]}>
              <Image source={require('../assets/edh-logo.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor()}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor()}]}>{edhCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.storm) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.storm)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide, {borderRightColor: elementsColor}]} activeOpacity={1} delayPressIn={0}>
            <View style={[styles.counter, {backgroundColor: tintBackgroundColor(CounterTypes.storm)}]}>
              <Image source={require('../assets/storm-logo.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor()}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor()}]}>{stormCounter}</Text>
            </View>
          </TouchableOpacity> }
          <View >
            <TouchableOpacity onPress={()=>handleOnBurgerMenu()} style={{marginBottom: scaleSize(4, size), alignItems: 'flex-end', justifyContent: 'center', marginLeft: scaleSize(10, size),}} activeOpacity={1} delayPressIn={0}>
              <Image
                source={getPlayerIcon()}
                resizeMode = 'contain'
                style= {{
                  height: 40,
                  width: 40,
                  tintColor: isMenuOpen ? elementsColor : 'white'
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[
          styles.menu_expanded, 
          isMenuOpen? undefined : styles.menu_expanded__hide, 
          {height: size === Size.medium ? '80%':'90%', 
          marginTop: '10%',
          marginBottom: size === Size.medium ? '2%':'2%', 
          width: '100%',
        }]}>
          { selectedMenu === '' ? <MenuItems /> : <MenuItemWrapper />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },

  menu_expanded__hide: {
    display: 'none',
  },
  menu_expanded: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
  },
  menuItems__wrapper: {
    height: '100%',
  },
  menuItems_row: {
    height: '50%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  menuItem__icon: {
    alignItems: 'center',
  },
  menuItem: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 70,
    marginRight: 10,
    marginLeft: 10,
  },
  counter: {
    display: 'flex',
    alignItems: 'center'
  },
  counterAmount: {
    textShadowRadius: 10,
    textAlign: 'center',
  },
  extraCounter: {
    borderRightWidth: 1,
    flex: 1
  },
  hide: {
    display: 'none'
  },
  backArrow: {
    flex: 1,
    marginBottom: 4,
    alignItems: 'flex-start'
  }
});
