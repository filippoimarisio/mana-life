import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';

export default function PlayerMenu({handleOnBurgerMenu, isMenuOpen}) {
  
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={[styles.utilityButtons, isMenuOpen? undefined : styles.utilityButtons__hide]}>
          <View style={styles.utilityButtons__wrapper}>
            <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/></TouchableOpacity> 
            <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/></TouchableOpacity> 
          </View>
          <View style={styles.utilityButtons__wrapper}>
            <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/></TouchableOpacity> 
            <TouchableOpacity><Image source={require('../assets/mtg-logo.png')} resizeMode = 'contain' style= {{ height: 50, width: 50,}}/></TouchableOpacity> 
          </View>
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
    backgroundColor: 'background: rgba(255, 255, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  wrapper: {
    backgroundColor: 'background: rgba(0, 0, 0, 0.3)',
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    padding: 20
  },
  utilityButtons__hide: {
    display: 'none',
  },
  utilityButtons: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'red',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    paddingTop: 60,
  },
  utilityButtons__wrapper: {
    height: '50%',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  }
});
