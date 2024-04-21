import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React, {useContext, memo} from 'react';
import {Context} from '../context'

const MainMenuInitialLife = () => {

  const {setInitialLifeTotal, initialLifeTotal, elementsColor} = useContext(Context) as any

  console.log('refresh')

  const selectedValues = {
    borderColor: elementsColor,
    color: elementsColor
  }

  return (
    <View style={styles.initialLife}>
      <TouchableOpacity onPress={()=>setInitialLifeTotal(20)} activeOpacity={1} delayPressIn={0} style={{alignItems:'flex-start'}}>
        <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 20 && selectedValues]}>
          <Text style={[styles.initialLifeValue, initialLifeTotal === 20 && selectedValues]}>20</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setInitialLifeTotal(30)} activeOpacity={1} delayPressIn={0}>
        <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 30 && selectedValues]}>
          <Text style={[styles.initialLifeValue, initialLifeTotal === 30 && selectedValues]}>30</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setInitialLifeTotal(40)} activeOpacity={1} delayPressIn={0} style={{alignItems:'flex-end'}}>
        <View style={[styles.initialLifeValueWrapper, initialLifeTotal === 40 && selectedValues]}>
          <Text style={[styles.initialLifeValue, initialLifeTotal === 40 && selectedValues]}>40</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default memo(MainMenuInitialLife)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  initialLife: {
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  initialLifeValue: {
    fontSize: 30,
    color: 'gray',
  },
  initialLifeValueWrapper: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'gray',
    borderWidth: 4,
    borderRadius: 10,
  },
});
