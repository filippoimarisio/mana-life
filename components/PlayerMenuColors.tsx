import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, {useState, useEffect} from 'react';
import {Mana} from '../utils'
import {colorCodes} from '../utils'

export default function PlayerMenuColors({handleOnSelectColor, selectedColors}) {

  type ValueOf<T> = T[keyof T];

  const ManaButton = ({baseColor, highlightColor, colorIdentity, style}) => {
    return (
      <TouchableOpacity onPress={()=> handleOnSelectColor(colorIdentity)} style={style}>
        <View style={[styles.manaButtonWrapper, {backgroundColor: selectedColors.includes(colorIdentity) ? baseColor: 'transparent'}]}>
          <View style={[styles.manaButton, {backgroundColor: selectedColors.includes(colorIdentity) ? highlightColor: highlightColor}]}></View>
        </View>
      </TouchableOpacity> 
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <ManaButton baseColor={colorCodes.forest} highlightColor={colorCodes.forest_logo} colorIdentity={Mana.forest} style={styles.row_topLeft}/>
        <ManaButton baseColor={colorCodes.plains} highlightColor={colorCodes.plains_logo} colorIdentity={Mana.plains} style={{}}/>
        <ManaButton baseColor={colorCodes.island} highlightColor={colorCodes.island_logo} colorIdentity={Mana.island} style={styles.row_topRight}/>
      </View>
      <View style={styles.row}>
        <ManaButton baseColor={colorCodes.mountain} highlightColor={colorCodes.mountain_logo} colorIdentity={Mana.mountain} style={{}}/>
        <ManaButton baseColor={colorCodes.swamp} highlightColor={colorCodes.swamp_logo} colorIdentity={Mana.swamp} style={{}}/>
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
    paddingTop: 120
  },
  row_topRight: {
    paddingTop: 120
  },
  manaButtonWrapper: {
    borderRadius: 60,
    height: 80,
    width: 80,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  manaButton: {
    borderRadius: 30,
    height: 60,
    width: 60,
  }
});
