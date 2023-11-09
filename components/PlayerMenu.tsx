import { StyleSheet, Image, View } from 'react-native';

export default function PlayerMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require('../assets/mtg-logo.png')}
          resizeMode = 'contain'
          style= {{
            height: 40,
            width: 40,
          }}
        />
        <Image
          source={require('../assets/burger-menu.png')}
          resizeMode = 'contain'
          style= {{
            height: 40,
            width: 40,
            tintColor: 'black'
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 70
  },
  wrapper: {
    backgroundColor: 'background: rgba(0, 0, 0, 0.3)',
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 20
  }
});
