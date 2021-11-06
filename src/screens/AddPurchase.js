import React from "react";
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Picker } from '@react-native-picker/picker'
import { withTheme } from "react-native-elements";

const AddPurchase = ({navigation}) => {

    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState("Select Category");

    return (
        <View style={styles.container}>
            <Text style={styles.addPurchaseHeader}>
                Add A Purchase
            </Text>
            <Text style={styles.addPurchaseSubHeader}>
                Company Name
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Enter Company Name"
                keyboardType="default"
            />


            <Text style={styles.addPurchaseSubHeader}>
                Category
            </Text>
            <Picker
                selectedValue={selectedValue}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                >
                <Picker.Item label="Groceries" value="groceries" />
                <Picker.Item label="Dining" value="dining" />
                <Picker.Item label="Shopping" value="shopping" />
                <Picker.Item label="Transport" value="transport" />
                <Picker.Item label="Travel" value="travel" />
                <Picker.Item label="Health" value="health" />
                <Picker.Item label="Insurance" value="insurance" />
                <Picker.Item label="Education" value="education" />
                <Picker.Item label="Utilities" value="utilities" />
                <Picker.Item label="Finance" value="finance" />
                <Picker.Item label="Fun-Money" value="funMoney" />
            </Picker>


            <Text style={styles.addPurchaseSubHeader}>
                Purchase Amount
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Enter Purchase Amount"
                keyboardType="numeric"
            />


            <TouchableOpacity style={styles.submitStyling} onPress={() => alert('Your Purchase Has Been Added!')}>
                <Text 
                    style={{
                        fontFamily: 'PierSans-Regular',
                        fontSize: hp('2%'),
                        //backgroundColor: '#03A608', 
                        textAlign: 'center',
                        color: 'white',
                        // height: hp('7%'),
                        // width: wp('75%'),
                        // borderRadius: hp('2%'),
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // textAlign:'center',
                        // alignSelf:'center'
                                            }}         
                    >  
                    Submit
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddPurchase;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#002B19',
        paddingTop: 60,
    },
    addPurchaseHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: 28,
        padding: 16,
        marginTop: 16,
        color: 'white',
        paddingBottom: 30,
    },
    addPurchaseSubHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: 20,
        padding: 0,
        marginTop: 16,
        color: 'white',
    },
    input: {
        fontFamily: 'PierSans-Regular',
        height: hp('6%'),
        width: wp('75%'),
        margin: hp('1%'),
        borderWidth: 1,
        padding: 10,
        color: 'black',
        borderRadius: hp('1.5%'),
        backgroundColor: 'white'
      },

    submitStyling: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#407565',
        height: hp('7%'),
        width: wp('75%'),
        borderRadius: hp('2%'),
        marginTop: hp('2%')
      }
})
