import React from 'react';
import {Dimensions} from 'react-native';
import Animated from 'react-native-reanimated';

// const [width, height] = Dimensions.get();

const App = () => {
  return (
    <Animated.View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8ff',
      }}>
      <Animated.View
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: '#4f08aa',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Text style={{color: 'white', fontSize: 24}}>
          Test
        </Animated.Text>
      </Animated.View>
      <Animated.View
        style={{
          flex: 2,
          width: '85%',
          backgroundColor: 'white',
          marginVertical: '6%',
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.Text>Test</Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default App;
