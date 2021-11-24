import React from 'react';
//import Home from './src/screens/Home';
//import Animated from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';
import Tabs from './src/navigation/tabs';
import Login from './src/test/Login';
import Test from './src/test/Test';
import Home from './src/screens/Home';
import Register from './src/screens/Register';
import BudgetConfig from './src/screens/BudgetConfig';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'Login'} component={Login} />
        <Stack.Screen name={'Tabs'} component={Tabs} />
        <Stack.Screen name={'Test'} component={Test} />
        <Stack.Screen name ={'Register'} component={Register}/>
        <Stack.Screen name ={'BudgetConfig'} component={BudgetConfig}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
