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
  const [resetTrigger, setResetTrigger, backgroundColor, elementsColor, playersNumber, setPlayersNumber] = useContext(Context)

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
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.colorSelection)}>
            <Image source={require(`../assets/palette.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: elementsColor || 'white'}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.counterTypes)}>
            <Image source={require('../assets/counter-types-logo.png')} resizeMode = 'contain' style= {{ height: 90, width: 90, tintColor: elementsColor || 'white'}}/>
          </TouchableOpacity> 
        </View>
        { playersNumber < 3 && <View style={[styles.menuItems_row]}>
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.manaCount)}>
            <Image source={require(`../assets/bottle-tonic.png`)} resizeMode = 'contain' style= {{ height: adjustedSize, width: adjustedSize, tintColor: elementsColor || 'white'}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.lifeLogs)}>
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

  const tintColor = (counterType: ValueOf<typeof CounterTypes>): string => {
    return currentCounterType.includes(counterType) ? isMenuOpen ? elementsColor : 'white' : 'gray'
  }

  const onBackArrow = () => {
    setSelectedMenu('')
  }
  
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { backgroundColor : isMenuOpen ? backgroundColor : undefined, padding: scaleSize(20, size)}]}>
        <View style={[styles.navbar, {marginTop: scaleSize(30, size)}]}>
          { selectedMenu ?<View><TouchableOpacity onPress={()=> onBackArrow()} style={styles.backArrow}>
            <Image
              source={require('../assets/arrow-left__white.png')}
              resizeMode = 'contain'
              style= {{
                height: 40,
                width: 40,
                tintColor: elementsColor
              }}
            />
          </TouchableOpacity></View> : <View style={{height: scaleSize(40, size), width: scaleSize(40, size)}}></View> }
          { selectedCounterTypes.length > 0 && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.life)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide, {borderLeftColor: 'gray', borderLeftWidth: 1}]}>
            <View style={styles.counter}>
              <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor(CounterTypes.life)}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor(CounterTypes.life)}]}>{lifeCounter}</Text>
            </View>
          </TouchableOpacity> }
          { selectedCounterTypes.includes(CounterTypes.poison) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.poison)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide]}>
            <View style={styles.counter}>
              <Image source={require('../assets/poison-logo.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor(CounterTypes.poison)}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor(CounterTypes.poison)}]}>{poisonCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.edh) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.edh)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide]}>
            <View style={styles.counter}>
              <Image source={require('../assets/edh-logo.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor(CounterTypes.edh)}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor(CounterTypes.edh)}]}>{edhCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.storm) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.storm)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide]}>
            <View style={styles.counter}>
              <Image source={require('../assets/storm-logo.png')} resizeMode = 'contain' style= {{height: scaleSize(20, size),width: scaleSize(20, size), tintColor: tintColor(CounterTypes.storm)}}/>
              <Text style={[styles.counterAmount, {fontSize: scaleSize(40, size), width: scaleSize(100, size), color: tintColor(CounterTypes.storm)}]}>{stormCounter}</Text>
            </View>
          </TouchableOpacity> }
          <View >
            <TouchableOpacity onPress={()=>handleOnBurgerMenu()} style={{marginBottom: scaleSize(4, size), alignItems: 'flex-end', justifyContent: 'center'}}>
              <Image
                source={require('../assets/burger-menu__white.png')}
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
    borderRightColor: 'gray',
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
