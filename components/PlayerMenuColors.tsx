import { StyleSheet, Text, View } from 'react-native';

export default function PlayerMenuColors() {
  return (
    <View style={styles.container}>
      {/* <Text>Colors</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
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
