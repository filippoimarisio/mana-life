import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import PlayerMenuColors from './PlayerMenuColors';
import PlayerMenuLifeLogs from './PlayerMenuLifeLogs';
import PlayerMenuMana from './PlayerMenuMana';
import {Context} from '../App';
import {CounterTypes} from '../utils'
import PlayerMenuCounters from './PlayerMenuCounters'

export default function PlayerMenu({onBurgerMenu, isMenuOpen, handleOnSelectColor, selectedColors, playerIndex, poisonCounter, edhCounter, stormCounter, lifeCounter}) {

  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedCounterTypes] = useContext(Context)

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
            <Image source={require(`../assets/palette.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: 'orange'}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.lifeLogs)}>
            <Image source={require(`../assets/heart-pulse.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80, tintColor: '#D2042D'}}/>
          </TouchableOpacity> 
        </View>
        <View style={styles.menuItems_row}>
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.manaCount)}>
            <Image source={require(`../assets/wubrg_compact.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.counterTypes)}>
            <Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 80, width: 80,}}/>
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
        { selectedMenu === MenuItemsEnum.counterTypes && <PlayerMenuCounters /> }
      </View>
    )
  }

  const onCounterType = (counterType: ValueOf<typeof CounterTypes>): void => {
    
  }

  
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, isMenuOpen ? styles.wrapper__darker : undefined]}>
        <View style={[styles.menu_expanded, isMenuOpen? undefined : styles.menu_expanded__hide]}>
          { selectedMenu === '' ? <MenuItems /> : <MenuItemWrapper />}
        </View>
        <View style={styles.navbar}>
          { selectedMenu ? <TouchableOpacity onPress={()=> setSelectedMenu('')}>
            <Image
              source={require('../assets/arrow-left__white.png')}
              resizeMode = 'contain'
              style= {{
                height: 40,
                width: 40,
              }}
            />
          </TouchableOpacity> : <View style={{height: 40, width: 40}}></View> }
          { selectedCounterTypes.length > 0 && <TouchableOpacity onPress={()=>onCounterType(CounterTypes.life)}>
            <View style={styles.counter}>
              <Image source={require('../assets/heart.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: 'white'}}/>
              <Text style={styles.counterAmount}>{lifeCounter}</Text>
            </View>
          </TouchableOpacity> }
          { selectedCounterTypes.includes(CounterTypes.poison) && <TouchableOpacity onPress={()=>onCounterType(CounterTypes.poison)}>
            <View style={styles.counter}>
              <Image source={require('../assets/poison-logo.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: 'white'}}/>
              <Text style={styles.counterAmount}>{poisonCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.edh) && <TouchableOpacity onPress={()=>onCounterType(CounterTypes.edh)}>
            <View style={styles.counter}>
              <Image source={require('../assets/edh-logo.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: 'white'}}/>
              <Text style={styles.counterAmount}>{edhCounter}</Text>
            </View>
          </TouchableOpacity>}
          { selectedCounterTypes.includes(CounterTypes.storm) && <TouchableOpacity onPress={()=>onCounterType(CounterTypes.storm)}>
            <View style={styles.counter}>
              <Image source={require('../assets/storm-logo.png')} resizeMode = 'contain' style= {{height: 20,width: 20, tintColor: 'white'}}/>
              <Text style={styles.counterAmount}>{stormCounter}</Text>
            </View>
          </TouchableOpacity> }
          <TouchableOpacity onPress={()=>handleOnBurgerMenu()}>
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
    height: '100%',
    paddingTop: 60,
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
    alignItems: 'flex-end',
    flexDirection: 'row',
    width: "100%",
  },
  counter: {
    display: 'flex',
    alignItems: 'center'
  },
  counterAmount: {
    fontSize: 40,
    color: 'white',
    shadowColor: 'black',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
});
