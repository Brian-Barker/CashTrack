import React from 'react';
//import Home from './src/screens/Home';
//import Animated from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import Home from './src/screens/Home';


const App = () => {
  return(
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  ); 
  
}


export default App;