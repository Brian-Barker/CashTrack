import React, {useState} from "react";
import { View, Text, Button, Alert, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker'

import Transaction from '../../components/Transaction';

let tempTransactions = [
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.53'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
    {name: 'Publix Super Markets', category: 'Groceries', amount: '69.42'},
  ];


const transactionsGroceries = ({navigation}) => {

    const [text, onChangeText] = React.useState(null);
    const [number, onChangeNumber] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState("Select Category");

    let [isModalVisible, setModalVisible] = useState(false);

    function toggleModal() {
        setModalVisible(!isModalVisible);
    }

    return (
        <View style={styles.container}>
            <Text style ={styles.categoryViewHeader}> 
                Grocery Tranactions
            </Text>

            <ScrollView nestedScrollEnabled={true}>
                <View style={{marginBottom:hp('10%'),backgroundColor:'#407565',borderRadius:hp('1.5%')}}>
                    {tempTransactions.map((item, index) => (
                        <TouchableOpacity  onPress={toggleModal}>
                            <Transaction key={index} item={item} delay={index} />           
                        </TouchableOpacity>
                    ))}
                </View>

                <Modal 
                    onBackdropPress={ ()=> toggleModal()}
                    isVisible={isModalVisible}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                >
                    <View style={{
                        backgroundColor:'#407565',
                        height: hp('60%'),
                        width: wp('70%'),
                        alignSelf: 'center'
                    }}>
                        
                        <Text style={styles.subMenuText}>
                            Edit Purchase Location
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeText}
                            value={text}
                            placeholder="Enter New Location"
                            keyboardType="default"
                        />

                        <Text style={styles.subMenuText}>
                            Edit Purchase Category
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


                        <Text style={styles.subMenuText}>
                            Edit Purchase Amount
                        </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChangeNumber}
                            value={number}
                            placeholder="Enter New Amount"
                            keyboardType="numeric"
                        />


                        <TouchableOpacity style={styles.submitStyling} onPress={toggleModal}>
                            <Text 
                                style={{
                                    fontFamily: 'PierSans-Regular',
                                    fontSize: hp('2%'),
                                    backgroundColor: '#03A608', 
                                    alignSelf: 'center',
                                    color: 'white',
                                    height: hp('5%'),
                                    width: wp('60%'),
                                    textAlign: 'center',
                                    padding: hp('1%'),
                                    margin: hp('1%'),
                                    borderRadius: hp('1.5%'),
                                }}         
                                >  
                                Update Purchase
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitStyling} onPress={toggleModal}>
                            <Text 
                                style={{
                                    fontFamily: 'PierSans-Regular',
                                    fontSize: hp('2%'),
                                    backgroundColor: 'red', 
                                    alignSelf: 'center',
                                    color: 'white',
                                    height: hp('5%'),
                                    width: wp('60%'),
                                    textAlign: 'center',
                                    padding: hp('1%'),
                                    margin: hp('1%'),
                                    borderRadius: hp('1.5%'),
                                }}         
                                >  
                                Remove Purchase
                            </Text>
                        </TouchableOpacity>
                            
                    </View>

                </Modal>

            </ScrollView>
        </View>
    )
}

export default transactionsGroceries;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#002B19',
        color:'white'
    },
    categoryViewHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('4%'),
        padding: hp('1%'),
        marginTop: hp('2%'),
        color: 'white',
    },
    transactionModifierButton: {
        fontSize: hp('3%'),
        backgroundColor: '#03A608', 
        textAlign: 'center',
        color: 'white',
        height: hp('10%'),
        width: wp('65%'),
        borderRadius: 10,
        margin: hp('1%'),
        alignContent: 'center',
        paddingTop: hp('3%')
    },
    subMenuText: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('2.5%'),
        padding: 0,
        marginTop: 16,
        color: 'white',
        backgroundColor: '#407565',
    },
    input: {
        height: hp('6%'),
        width: wp('65%'),
        margin: hp('1%'),
        borderWidth: 1,
        padding: 1,
        color: 'black',
        alignContent: 'center',
        backgroundColor: 'white',
        paddingBottom: hp('1%'),
        marginBottom: hp('2%'),
        textAlign: 'center',
        borderRadius: hp('1.5%')
    },
})
