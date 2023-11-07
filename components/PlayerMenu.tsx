import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Player from './Player';
import MainMenu from './MainMenu';

export default function PlayerMenu() {
  return (
    <View style={styles.container}>
      <Text>PlayerMenu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});
