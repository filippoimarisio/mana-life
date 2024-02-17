import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Mana} from '../utils'

export default function PlayerMenuColors({handleOnSelectColor, selectedColors}) {

  type ValueOf<T> = T[keyof T];

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={()=> handleOnSelectColor(Mana.forest)} style={styles.row_topLeft}>
          {selectedColors.includes(Mana.forest) ? 
            <Image source={require('../assets/forest-logo__colored.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> :
            <Image source={require('../assets/forest-logo.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> 
          }
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> handleOnSelectColor(Mana.island)}>
          {selectedColors.includes(Mana.island) ? 
            <Image source={require('../assets/island-logo__colored.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> :
            <Image source={require('../assets/island-logo.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> 
          }
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> handleOnSelectColor(Mana.plains)} style={styles.row_topRight}>
          {selectedColors.includes(Mana.plains) ? 
            <Image source={require('../assets/plains-logo__colored.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> :
            <Image source={require('../assets/plains-logo.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> 
          }
        </TouchableOpacity> 
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={()=> handleOnSelectColor(Mana.mountain)}>
          {selectedColors.includes(Mana.mountain) ? 
            <Image source={require('../assets/mountain-logo__colored.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> :
            <Image source={require('../assets/mountain-logo.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> 
          }
        </TouchableOpacity> 
        <TouchableOpacity onPress={()=> handleOnSelectColor(Mana.swamp)}>
          {selectedColors.includes(Mana.swamp) ? 
            <Image source={require('../assets/swamp-logo__colored.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> :
            <Image source={require('../assets/swamp-logo.png')} resizeMode = 'contain' style= {{ height: 70, width: 70,}}/> 
          }
        </TouchableOpacity> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  row: {
    height: "50%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-around',
    paddingLeft: 50,
    paddingRight: 50
  },
  row_topLeft: {
    paddingTop: 100
  },
  row_topRight: {
    paddingTop: 100
  }
});
