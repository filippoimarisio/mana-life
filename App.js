import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Player from './components/Player';
import MainMenu from './components/MainMenu';

export const Context = React.createContext([])

export default function App() {

  const [lifeLogsPlayerOne, setLifeLogsPlayerOne] = useState([])
  const [lifeLogsPlayerTwo, setLifeLogsPlayerTwo] = useState([])

  const initialLifeTotal = 20

  // Sets intial life total
  useEffect(()=>{
    setLifeLogsPlayerOne([initialLifeTotal])
    setLifeLogsPlayerTwo([initialLifeTotal])
  }, [])

  return (
    <Context.Provider value={[lifeLogsPlayerOne, setLifeLogsPlayerOne, lifeLogsPlayerTwo, setLifeLogsPlayerTwo]}>
      <View style={styles.container}>
        <View style={[styles.container, styles.down]}>
          <Player playerIndex={0}/>
        </View>
        <View style={{height: 30, width: '100%'}}>
          <MainMenu />
        </View>
        <Player playerIndex={1}/>
      </View>
    </Context.Provider>
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
