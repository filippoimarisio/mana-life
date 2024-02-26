import { StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Mana, scaleSize, colorCodes, BackgroundImages, findKeyByValue, findColorIdentity} from '../utils'

const isSameColour = (array: string[]): boolean => {
  if (array[0] === array[1]) return true
  else return false
}

export default function PlayerMenuColors({handleOnSelectColor, selectedColors, size}) {

  type ValueOf<T> = T[keyof T];

  const ManaButton = ({baseColor, highlightColor, colorIdentity,}) => {
    return (
        <TouchableOpacity onPress={()=> handleOnSelectColor(colorIdentity)} style={{width: '100%'}}>
          <View style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center'}}>
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
          </View>
        </TouchableOpacity> 
    )
  }

  const getManaButtonsContainerWidth = () => {
    return 100/selectedColors.length.toString() + '%'
  }

  const CombinedColorElement = () => {
    const colorId = findColorIdentity(selectedColors)
    return (
      <View style={[styles.colorElement]}>
        <View style={styles.manaButtonsContainer}>
          {selectedColors.map((color: string, index: number)=> {
          return (
            <View style={[styles.manaButtonContainer, {marginBottom: '5%', width: (getManaButtonsContainerWidth() as any)}]} key={index}>
              <ManaButton baseColor={colorCodes[color]} highlightColor={colorCodes[color + '_logo']} colorIdentity={color}/>
            </View>
          )})}
        </View>
        <View style={[styles.colorElement__image]}>
          <Image
            source={BackgroundImages[colorId]} 
            style={{
              resizeMode: 'cover',
              height: '100%',
              width: '100%',
            }}/> 
        </View>
      </View>
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

  const showColourElement = (colourId: ValueOf<Mana>): boolean => {
    if (selectedColors.length === 1) return true
    if (selectedColors.length === 2 && (!selectedColors.includes(colourId) || isSameColour(selectedColors))) return true
    return false
  }

  const showCombinedColourElement = (): boolean => {
    if (selectedColors.length === 1) return false
    if (selectedColors.length === 2 && isSameColour(selectedColors)) return false
    return true
  }

  return (
    <View style={styles.container}>
        {showColourElement(Mana.forest) && <View style={[styles.colorElementContainer, styles.oneColour]}><ColorElement baseColor={colorCodes.forest} highlightColor={colorCodes.forest_logo} colorIdentity={Mana.forest}/></View>}
        {showColourElement(Mana.plains) && <View style={[styles.colorElementContainer, styles.oneColour]}><ColorElement baseColor={colorCodes.plains} highlightColor={colorCodes.plains_logo} colorIdentity={Mana.plains}/></View>}
        {showCombinedColourElement() && <View style={[styles.colorElementContainer,styles.twoColours]}><CombinedColorElement/></View>}
        {showColourElement(Mana.island) && <View style={[styles.colorElementContainer, styles.oneColour]}><ColorElement baseColor={colorCodes.island} highlightColor={colorCodes.island_logo} colorIdentity={Mana.island}/></View>}
        {showColourElement(Mana.mountain) && <View style={[styles.colorElementContainer, styles.oneColour]}><ColorElement baseColor={colorCodes.mountain} highlightColor={colorCodes.mountain_logo} colorIdentity={Mana.mountain}/></View>}
        {showColourElement(Mana.swamp) && <View style={[styles.colorElementContainer, styles.oneColour]}><ColorElement baseColor={colorCodes.swamp} highlightColor={colorCodes.swamp_logo} colorIdentity={Mana.swamp}/></View>}
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
    height: '80%',
    marginTop: '5%'
  },
  oneColour: {width: '20%'},
  twoColours: {width: '40%'},
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
  manaButtonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  }
});
