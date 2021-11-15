import React from 'react';
import Home from './src/screens/Home';
import Login from './src/test/Login';
import Test from './src/test/Test';
import Animated from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  // // return <Home />;
  // return <Login />;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Test'} component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
