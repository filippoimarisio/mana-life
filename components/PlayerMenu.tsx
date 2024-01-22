import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import PlayerMenuColors from './PlayerMenuColors';

export default function PlayerMenu({onBurgerMenu, isMenuOpen}) {

  const [selectedMenu, setSelectedMenu] = useState('');

  enum MenuItemsEnum {
    colorSelection = 'colorSelection',
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
            <Image source={require(`../assets/color-pie.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/>
          </TouchableOpacity> 
          <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/></TouchableOpacity> 
        </View>
        <View style={styles.menuItems_row}>
          <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/></TouchableOpacity> 
          <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/></TouchableOpacity> 
        </View>
      </View>
    )
  }

  function MenuItemWrapper() {
    return (
      <View style={styles.menuItem__wrapper}>
        <View style={styles.menuItem__icon}>
        <TouchableOpacity onPress={()=> setSelectedMenu('')}>
          <Image source={require('../assets/color-pie.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/>
        </TouchableOpacity>
        </View>
        <View style={styles.menuItem}>
          { this.selectedMenu === MenuItemsEnum.colorSelection && <PlayerMenuColors />}
        </View>
      </View>
    )
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.menu_expanded, isMenuOpen? undefined : styles.menu_expanded__hide]}>
          { selectedMenu === '' ? <MenuItems /> : <MenuItemWrapper />}
        </View>
        <TouchableOpacity onPress={()=>handleOnBurgerMenu()}>
            <Image
              source={require('../assets/burger-menu.png')}
              resizeMode = 'contain'
              style= {{
                height: 40,
                width: 40,
                tintColor: 'black'
              }}
            />
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'background: rgba(255, 255, 0, 1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    backgroundColor: 'background: rgba(0, 0, 0, 0.1)',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    padding: 20
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
  menuItem__wrapper: {
    height: '100%',
    width: '100%',
  },
  menuItem__icon: {
    alignItems: 'center',
  },
  menuItem: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
