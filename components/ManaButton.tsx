import React, { useContext, memo, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ViewStyle } from 'react-native';
import { Context } from '../context';
import { Mana, colorCodes, Operations } from '../utils';

type ValueOf<T> = T[keyof T];

interface Props {
  baseColor: string;
  highlightColor: string;
  colorIdentity: ValueOf<typeof Mana>;
}

interface ContextType {
  manaCounter: Record<string, number>;
  backgroundColor: string;
  elementsColor: string;
  modifyManaCounter: any
}

const ManaButton: React.FC<Props> = ({ baseColor, highlightColor, colorIdentity }) => {
  console.log('refresh ManaButton');

  const contextValues = useContext(Context) as ContextType;
  const { manaCounter, backgroundColor, elementsColor, modifyManaCounter } = useMemo(() => contextValues, [contextValues]);

  const handleCounterInteraction = (mana: ValueOf<typeof Mana>, operation: ValueOf<typeof Operations>) => {
    const modifier = operation === Operations.plus ? 1 : -1;
    const counterObject = { ...manaCounter, [mana]: manaCounter[mana] + modifier };
    modifyManaCounter(counterObject);
  };

  interface ManaCounterProps {
    manaColor: ValueOf<typeof Mana>;
  }

  const ManaCounter: React.FC<ManaCounterProps> = ({ manaColor }) => {
    return (
      <View style={[styles.manaCounter, { borderColor: manaColor === 'plains' ? colorCodes[manaColor] : colorCodes[manaColor + '_logo'] }]}>
        <TouchableOpacity onPress={() => handleCounterInteraction(manaColor, Operations.minus)} style={styles.counterButton} activeOpacity={1} delayPressIn={0}>
          <Image
            source={require('../assets/minus-logo__white.png')}
            resizeMode='contain'
            style={{
              height: 25,
              width: 25,
              tintColor: elementsColor
            }}
          />
        </TouchableOpacity>
        <Text style={[styles.manaCounterDigit, { color: elementsColor, shadowColor: backgroundColor, textShadowColor: backgroundColor }]}>{manaCounter[manaColor]}</Text>
        <TouchableOpacity onPress={() => handleCounterInteraction(manaColor, Operations.plus)} style={styles.counterButton} activeOpacity={1} delayPressIn={0}>
          <Image
            source={require('../assets/plus-logo__white.png')}
            resizeMode='contain'
            style={{
              height: 25,
              width: 25,
              tintColor: elementsColor
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.manaLogoWrapper, { backgroundColor: baseColor, borderColor: highlightColor, borderWidth: 2 }]}>
        <View style={[styles.manaLogo, { backgroundColor: highlightColor }]}></View>
      </View>
      <ManaCounter manaColor={colorIdentity} />
    </View>
  );
};

export default memo(ManaButton);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  manaCounter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 40,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10,
    paddingTop: 10
  },
  manaCounterDigit: {
    fontSize: 35,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  counterButton: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  manaLogoWrapper: {
    marginBottom: -14,
    zIndex: 2,
    height: 26,
    width: 26,
    borderRadius: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  manaLogo: {
    height: 18,
    width: 18,
    borderRadius: 30
  },
});
