import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Player from './Player';
import MainMenu from './MainMenu';

export default function Display() {
  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.down]}>
        <Player />
      </View>
      <View style={{height: 30, width: '100%'}}>
        <MainMenu />
      </View>
      <Player />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  down: {
    transform: [{ rotate: '180deg'}]
  },
  left: {
    transform: [{ rotate: '90deg'}]
  },
  right: {
    transform: [{ rotate: '270deg'}]
  }
});
