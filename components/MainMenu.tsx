import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export default function MainMenu({resetPlayersLife}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=>resetPlayersLife()}>
        <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 30, width: 30, tintColor: 'white'}}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
});
