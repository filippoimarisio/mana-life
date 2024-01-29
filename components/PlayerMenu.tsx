import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import PlayerMenuColors from './PlayerMenuColors';
import PlayerMenuLifeLogs from './PlayerMenuLifeLogs';

export default function PlayerMenu({onBurgerMenu, isMenuOpen, handleOnSelectColor, selectedColors, tempCounterLogs}) {

  const [selectedMenu, setSelectedMenu] = useState("");

  enum MenuItemsEnum {
    colorSelection = 'colorSelection',
    lifeLogs = 'lifeLogs'
  }

  enum MenuItemsIconEnum {
    colorPie = 'color-pie',
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
            <Image source={require(`../assets/color-pie.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80,}}/>
          </TouchableOpacity> 
          <TouchableOpacity onPress={()=> handleMenuSelection(MenuItemsEnum.lifeLogs)}>
            <Image source={require(`../assets/heart-pulse.png`)} resizeMode = 'contain' style= {{ height: 80, width: 80,}}/>
          </TouchableOpacity> 
        </View>
        <View style={styles.menuItems_row}>
          <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 80, width: 80,}}/></TouchableOpacity> 
          <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 80, width: 80,}}/></TouchableOpacity> 
        </View>
      </View>
    )
  }

  function MenuItemWrapper() {
    return (
      <View style={styles.menuItem}>
        { selectedMenu === MenuItemsEnum.colorSelection && 
        <PlayerMenuColors handleOnSelectColor={handleOnSelectColor} selectedColors={selectedColors}/>
        }
        { selectedMenu === MenuItemsEnum.lifeLogs && 
        <PlayerMenuLifeLogs tempCounterLogs={tempCounterLogs}/>
        }
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, isMenuOpen ? styles.wrapper__darker : undefined]}>
        <View style={[styles.menu_expanded, isMenuOpen? undefined : styles.menu_expanded__hide]}>
          { selectedMenu === '' ? <MenuItems /> : <MenuItemWrapper />}
        </View>
        <View style={selectedMenu && styles.navbar}>
          { selectedMenu && <TouchableOpacity onPress={()=> setSelectedMenu('')}>
            <Image
              source={require('../assets/arrow-left__white.png')}
              resizeMode = 'contain'
              style= {{
                height: 40,
                width: 40,
              }}
            />
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
    flexDirection: 'row',
    width: "100%"
  }
});
