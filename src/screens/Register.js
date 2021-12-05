import React, {useEffect, useState} from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//import styles from '../styles';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {createUser} from '../apis/Backend';

const {height, width} = Dimensions.get('window');

const Register = ({navigation}) => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [firstname, setFirstName] = useState('');
  let [lastname, setLastName] = useState('');
  let [email, setEmail] = useState('');

  return (
    <Animated.View style={styles.container}>
      <Animated.View>
        <Animated.Text style={styles.headerText}>Create Account</Animated.Text>
      </Animated.View>
      <Animated.View style={styles.fieldContainer}>
        <Animated.View style={styles.inputBoxesContainer}>
          <TextInput
            onChangeText={text => setFirstName(text)}
            style={styles.inputBoxes}
            placeholder={'First Name'}
            placeholderTextColor="#407565"
            maxLength={25}
            selectionColor="#002B19"
          />
          <TextInput
            onChangeText={text => setLastName(text)}
            style={styles.inputBoxes}
            placeholder={'Last Name'}
            placeholderTextColor="#002B19"
            maxLength={25}
            selectionColor="#002B19"
          />
          <TextInput
            onChangeText={text => setUsername(text)}
            style={styles.inputBoxes}
            placeholder={'Username'}
            placeholderTextColor="#002B19"
            maxLength={25}
          />
          <TextInput
            onChangeText={text => setEmail(text)}
            style={styles.inputBoxes}
            placeholder={'Email'}
            placeholderTextColor="#002B19"
            maxLength={25}
          />
          <TextInput
            onChangeText={text => setPassword(text)}
            style={styles.inputBoxes}
            placeholder={'Password'}
            placeholderTextColor="#002B19"
            maxLength={25}
            secureTextEntry
          />
        </Animated.View>
      </Animated.View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('BudgetConfig', {
            firstname,
            lastname,
            username,
            email,
            password,
          });
        }}
        style={styles.registerButtonContainer}>
        <Animated.Text style={styles.registerButtonText}>Next</Animated.Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#002B19' //Highland
    //backgroundColor: '#d8ede6', //SpringMint
    //backgroundColor: '#E5FAF3',
    //backgroundColor: 'white'
    backgroundColor: '#407565',
  },
  fieldContainer: {
    alignItems: 'center',
    height: hp('55%'),
    width: wp('85%'),
    backgroundColor: '#E5FAF3',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: hp('1.5%'),
    marginTop: hp('3%'),
  },
  headerText: {
    fontFamily: 'PierSans-Regular',
    //color:'#002B19',
    color: 'white',
    fontSize: hp('4%'),
    marginTop: hp('7%'),
    marginBottom: hp('2%'),
  },
  inputBoxesContainer: {
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  inputBoxes: {
    height: height * 0.06,
    width: width * 0.65,
    alignSelf: 'center',
    //margin: 6,
    marginTop: hp('1%'),
    marginBottom: hp('2.5%'),
    // borderWidth: 1,
    borderColor: '#002B19',
    borderBottomWidth: hp('0.2%'),
    borderRadius: hp('0.5%'),
    //paddingHorizontal: 20,
    textAlign: 'center',
    color: '#002B19',
    fontSize: 18,
    backgroundColor: '#E5FAF3',
  },
  inputTitleText: {
    fontFamily: 'PierSans-Regular',
    fontSize: 12,
    marginLeft: hp('2.5%'),
    color: '#002B19', //Highland
  },
  registerButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.07,
    width: width * 0.7,
    marginTop: hp('5%'),
    borderRadius: hp('1.5%'),
    backgroundColor: '#002B19',
  },
  registerButtonText: {
    fontFamily: 'PierSans-Regular',
    color: 'white',
    fontSize: 20,
  },
});
