import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import React, {useState} from 'react';
import PlayerMenuColors from './PlayerMenuColors';
import PlayerMenuLifeLogs from './PlayerMenuLifeLogs';
import PlayerMenuMana from './PlayerMenuMana';
import {CounterTypes} from '../utils'
import PlayerMenuCounters from './PlayerMenuCounters'

export default function PlayerMenu({onBurgerMenu, isMenuOpen, handleOnSelectColor, selectedColors, playerIndex, poisonCounter, edhCounter, stormCounter, lifeCounter, setCurrentCounterType, currentCounterType, selectedCounterTypes, setSelectedCounterTypes}) {

  const [selectedMenu, setSelectedMenu] = useState("");

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
    return (
      <View style={styles.menuItems__wrapper}>
        <View style={styles.menuItems_row}>
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.colorSelection)}>
            <Image source={require(`../assets/palette.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: 'white'}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.lifeLogs)}>
            <Image source={require(`../assets/heart-pulse.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: 'white'}}/>
          </TouchableOpacity> 
        </View>
        <View style={styles.menuItems_row}>
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.manaCount)}>
            <Image source={require(`../assets/bottle-tonic.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: 'white'}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.counterTypes)}>
            <Image source={require('../assets/counter-types-logo.png')} resizeMode = 'contain' style= {{ height: 90, width: 90, tintColor: 'white'}}/>
          </TouchableOpacity> 
        </View>
      </View>
    )
  }

  function MenuItemWrapper() {
    return (
      <View style={styles.menuItem}>
        { selectedMenu === MenuItemsEnum.colorSelection && <PlayerMenuColors handleOnSelectColor={handleOnSelectColor} selectedColors={selectedColors}/>}
        { selectedMenu === MenuItemsEnum.lifeLogs && <PlayerMenuLifeLogs playerIndex={playerIndex}/>}
        { selectedMenu === MenuItemsEnum.manaCount && <PlayerMenuMana /> }
        { selectedMenu === MenuItemsEnum.counterTypes && <PlayerMenuCounters selectedCounterTypes={selectedCounterTypes} setSelectedCounterTypes={setSelectedCounterTypes}/> }
      </View>
    )
  }

  const onSelectCurrentCounterType = (counterType: ValueOf<typeof CounterTypes>): void => {
    if (currentCounterType !== counterType) setCurrentCounterType(counterType)
  }

  const tintColor = (counterType: ValueOf<typeof CounterTypes>): string => {
    return currentCounterType.includes(counterType) ? 'white' : 'gray'
  }
  
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, isMenuOpen ? styles.wrapper__darker : undefined]}>
        <View style={styles.navbar}>
          { selectedMenu ? <TouchableOpacity onPress={()=> setSelectedMenu('')} style={styles.backArrow}>
            <Image
              source={require('../assets/arrow-left__white.png')}
              resizeMode = 'contain'
              style= {{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity> : <View style={{height: 40, width: 40, flex: 1}}></View> }
          { selectedCounterTypes.length > 0 && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.life)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide, {borderLeftColor: 'gray', borderLeftWidth: 1}]}>
            <View style={styles.counter}>
              <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: tintColor(CounterTypes.life)}}/>
              <Text style={[styles.counterAmount, {color: tintColor(CounterTypes.life)}]}>{lifeCounter}</Text>
            </View>
          </TouchableOpacity> }
          { selectedCounterTypes.includes(CounterTypes.poison) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.poison)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide]}>
            <View style={styles.counter}>
              <Image source={require('../assets/poison-logo.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: tintColor(CounterTypes.poison)}}/>
              <Text style={[styles.counterAmount, {color: tintColor(CounterTypes.poison)}]}>{poisonCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.edh) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.edh)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide]}>
            <View style={styles.counter}>
              <Image source={require('../assets/edh-logo.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: tintColor(CounterTypes.edh)}}/>
              <Text style={[styles.counterAmount, {color: tintColor(CounterTypes.edh)}]}>{edhCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.storm) && <TouchableOpacity onPress={()=>onSelectCurrentCounterType(CounterTypes.storm)} style={[ styles.extraCounter, isMenuOpen && selectedMenu !== MenuItemsEnum.counterTypes && styles.hide]}>
            <View style={styles.counter}>
              <Image source={require('../assets/storm-logo.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: tintColor(CounterTypes.storm)}}/>
              <Text style={[styles.counterAmount, {color: tintColor(CounterTypes.storm)}]}>{stormCounter}</Text>
            </View>
          </TouchableOpacity> }
          <TouchableOpacity onPress={()=>handleOnBurgerMenu()} style={{marginBottom: 4, flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
            <Image
              source={require('../assets/burger-menu__white.png')}
              resizeMode = 'contain'
              style= {{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.menu_expanded, isMenuOpen? undefined : styles.menu_expanded__hide]}>
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
    padding: 20
  },
  wrapper__darker: {
    backgroundColor: 'background: rgba(0, 0, 0, 0.5)',
  },
  menu_expanded__hide: {
    display: 'none',
  },
  menu_expanded: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '85%',
  },
  menuItems__wrapper: {
    height: '100%',
    width: '100%',
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
    width: '100%',
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
    marginTop: 30
  },
  counter: {
    display: 'flex',
    alignItems: 'center'
  },
  counterAmount: {
    fontSize: 40,
    shadowColor: 'black',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
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
