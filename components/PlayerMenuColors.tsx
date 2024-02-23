import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Mana, scaleSize, Size} from '../utils'
import {colorCodes, BackgroundImages} from '../utils'

export default function PlayerMenuColors({handleOnSelectColor, selectedColors, size}) {

  type ValueOf<T> = T[keyof T];

  const ManaButton = ({baseColor, highlightColor, colorIdentity,}) => {
    return (
        <TouchableOpacity onPress={()=> handleOnSelectColor(colorIdentity)}>
          <View style={[
            styles.manaButtonWrapper, 
            { height: scaleSize(40, size), width: scaleSize(40, size),
            backgroundColor: selectedColors.includes(colorIdentity) ? baseColor: 'transparent'}
          ]}>
            <View style={[
              styles.manaButton,
              { height: scaleSize(30, size), width: scaleSize(30, size),
              backgroundColor: selectedColors.includes(colorIdentity) ? highlightColor: highlightColor}
            ]}></View>
          </View>
        </TouchableOpacity> 
    )
  }

  const ColorElement = ({baseColor, highlightColor, colorIdentity}) => {
    return (
      <View style={[styles.colorElement]}>
        <View style={styles.manaButtonContainer}>
          <ManaButton baseColor={baseColor} highlightColor={highlightColor} colorIdentity={colorIdentity}/>
        </View>
        <View style={styles.colorElement__image}>
          {!selectedColors.includes(colorIdentity) && <Image
            source={BackgroundImages[colorIdentity]} 
            style={{
              resizeMode: 'cover',
              height: '100%',
              width: '100%',
              position: 'absolute',
              opacity: 0.3
            }}/>}
          <Image
            source={BackgroundImages[colorIdentity]} 
            style={{
              resizeMode: 'cover',
              height: '100%',
              width: '100%',
              tintColor: selectedColors.includes(colorIdentity) ? undefined: 'gray',
              opacity: selectedColors.includes(colorIdentity) ? 1: 0.3
            }}/> 
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
        <View style={styles.colorElementContainer}><ColorElement baseColor={colorCodes.forest} highlightColor={colorCodes.forest_logo} colorIdentity={Mana.forest}/></View>
        <View style={styles.colorElementContainer}><ColorElement baseColor={colorCodes.plains} highlightColor={colorCodes.plains_logo} colorIdentity={Mana.plains}/></View>
        <View style={styles.colorElementContainer}><ColorElement baseColor={colorCodes.island} highlightColor={colorCodes.island_logo} colorIdentity={Mana.island}/></View>
        <View style={styles.colorElementContainer}><ColorElement baseColor={colorCodes.mountain} highlightColor={colorCodes.mountain_logo} colorIdentity={Mana.mountain}/></View>
        <View style={styles.colorElementContainer}><ColorElement baseColor={colorCodes.swamp} highlightColor={colorCodes.swamp_logo} colorIdentity={Mana.swamp}/></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  colorElementContainer: {
    width: '20%',
    height: '80%',
    marginTop: '5%'
  },
  colorElement: {    
    height: '100%',
    width: '100%'
  },
  manaButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginBottom: '10%',
  },
  manaButtonWrapper: {
    borderRadius: 60,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  manaButton: {
    borderRadius: 30,
  },
  colorElement__image: {
    borderColor: 'black',
    borderWidth: 1,
    height: '100%',
    width: '100%',
    display: 'flex', 
  },
});
