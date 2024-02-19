import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

export default function MainMenu({resetPlayersLife, setShowMainMenu, showMainMenu}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=> setShowMainMenu(!showMainMenu)}>
          <Image source={require(`../assets/mtg-logo.png`)} resizeMode = 'contain' style= {{ height: 90, width: 90}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.options}>
        <TouchableOpacity onPress={()=>resetPlayersLife()}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>resetPlayersLife()}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>resetPlayersLife()}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>resetPlayersLife()}>
          <Image source={require(`../assets/restart.png`)} resizeMode = 'contain' style= {{ height: 50, width: 50, tintColor: 'white'}}/>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '100%',
    margin: '5%'
  },
  header: {
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  options: {
    height: '10%',
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },
  content: {
    height: '70%'
  }
});
