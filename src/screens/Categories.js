import React, {useState} from "react";
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {FlatGrid} from 'react-native-super-grid';
import Modal from "react-native-modal";
import { Picker } from '@react-native-picker/picker'

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated from "react-native-reanimated";

const Categories = ({navigation}) => {
    
    const [text, onChangeText] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState("Select Category");

    let [isModalVisible, setModalVisible] = useState(false);

    function toggleModal() {
        setModalVisible(!isModalVisible);
    }

    return (

        <View style={styles.container}>
            
            {/* <Animated.View style={styles.homeCategoryTextContainer}>
                <Text style={styles.homeCategoryTextHeader}>
                    Purchases By Category
                </Text>
            </Animated.View> */}

            <Animated.View style={styles.pieChartContainer}>
                <Text style={styles.pieChartHeader}>
                    Expense Breakdown
                </Text>
            
                <PieChart
                    data={[
                    {
                        name: 'Groceries',
                        percentage: 21,
                        color: '#7BBCA9',
                        legendFontColor: '#002B19',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Utilities',
                        percentage: 28,
                        color: '#A1E2CF',
                        legendFontColor: '#002B19',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Shopping',
                        percentage: 8,
                        color: '#2E6F5C',
                        legendFontColor: '#002B19',
                        legendFontSize: 15,
                    },
                    {
                        name: 'Dining',
                        percentage: 11,
                        color: '#559683',
                        legendFontColor: '#002B19',
                        legendFontSize: 15,
                    },
                    ]}
                    width={wp('85%')}
                    height={hp('25%')}
                    chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: hp('1%'),
                    },
                    }}
                    style={{
                    marginVertical: hp('0.5%'),
                    borderRadius: hp('2%'),
                    }}
                    accessor="percentage"
                    backgroundColor="transparent"
                    paddingLeft="8"
                    absolute //for the absolute number remove if you want percentage
                />
            </Animated.View>
            
            <Animated.View style={styles.categoryContainer}>
                <FlatGrid style={{width:wp('100%')}}
                    itemDimension={120}
                    style={{flex:1}}
                    //Brian
                    data={['Shopping','Entertainment','Groceries','Dining','Transit','Household','Health','Utilities','Travel','Finance','Personal','Other']}
                    renderItem={({ item }) => (
                    <View style={{justifyContent:'center',alignItems:'center'}}>

                        <TouchableOpacity style={styles.categoryButtons}>
                            <Text 
                                style={{
                                    fontFamily: 'PierSans-Regular',
                                    fontSize: hp('2.5%'),
                                    textAlign: 'center',
                                    color: 'white',
                                }}
                                //onPress={() => alert(item + ' Clicked!')}
                                
                                onPress={() => navigation.navigate('CategoricTransactions')}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )}
                />

                {/* Brian */}
                <Animated.View style={styles.createCategoryContainer}>
                    <TouchableOpacity style={{paddingBottom: hp('1.5%')}}>
                        <Text
                            style={styles.createCategoryText}
                            onPress={() => toggleModal()}
                        >
                            Create Category
                        </Text>
                    </TouchableOpacity>

                    <Modal 
                        onBackdropPress={ ()=> toggleModal()}
                        isVisible={isModalVisible}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                    >
                        <View style={{
                            backgroundColor:'#407565',
                            height: hp('39%'),
                            width: wp('70%'),
                            alignSelf: 'center',
                            borderRadius: hp('1.5%')
                        }}>
                            <Text style={styles.subMenuText}>
                                Enter New Category
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                value={text}
                                placeholder="New Category Name"
                                keyboardType="default"
                            />

                            <Text style={styles.subMenuText}>
                                Select Parent Category
                            </Text>
                            <Picker
                                selectedValue={selectedValue}
                                style={styles.input}
                                onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                                >
                                <Picker.Item label="None" value="none" />
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

                            <TouchableOpacity style={styles.submitStyling} onPress={toggleModal}>
                                <Text 
                                    style={{
                                        fontFamily: 'PierSans-Regular',
                                        fontSize: hp('2.25%'),
                                        backgroundColor: '#002B19', //Highland
                                        alignSelf: 'center',
                                        color: 'white',
                                        height: hp('5%'),
                                        width: wp('60%'),
                                        textAlign: 'center',
                                        paddingTop: hp('1%'),
                                        //marginBottom: hp('1%'),
                                        borderRadius: hp('1.5%'),
                                    }}         
                                    >  
                                    Add Category
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>

                </Animated.View>
            </Animated.View>

        </View>

    )
}

export default Categories;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        //backgroundColor: '#002B19', //Highland
        //backgroundColor: '#b2decf', //SurfnTurf
        //backgroundColor: '#c0e0d5' //RobinsNest
        //backgroundColor: '#d8ede6', //SpringMint
        backgroundColor: '#E5FAF3',
        //backgroundColor: 'white'
    },
    homeCategoryTextContainer: {
        textAlign: 'center',
        height:hp('7'),
        width:wp('85%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
        borderRadius:hp('1.5%'),
        backgroundColor:'transparent',
    },
    homeCategoryTextHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('4%'),
        marginTop: hp('2%'),
        color: 'white',
    },
    pieChartContainer: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('3'),
        height:hp('30'),
        width:wp('85%'),
        marginTop:hp('3.75%'),
        marginBottom:hp('2.75%'),
        borderRadius:hp('1.5%'),
        color: 'white',
        backgroundColor:'white',
    },
    pieChartHeader: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('3'),
        marginTop: hp('1%'),
        borderRadius:hp('1.5%'),
        color: '#002B19',
        backgroundColor:'transparent',
    },
    categoryContainer: {
        alignItems:'center',
        height:hp('46%'),
        width:wp('85%'),
        backgroundColor:'white',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:hp('1.5%'),
        marginTop:hp('1.75%'),
        marginBottom:hp('1.75%'),
    },
    categoryButtons: {
        height:hp('5%'),
        width:wp('36%'),
        flex:1,
        justifyContent:'center', 
        backgroundColor: '#407565',
        borderRadius: hp('0.75'),
        alignItems:'center', 
        // borderLeftWidth: 1.5, 
        // borderRightWidth: 1.5,
        borderColor:'#002B19'
    },
    createCategoryContainer: {
        alignItems:'center',
        height:hp('5.5%'),
        width:wp('45%'),
        //backgroundColor:'#002B19', //Highland
        backgroundColor: 'white',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius:hp('1.5%'),
        paddingTop:hp('0.75%'),
        marginBottom:hp('1%'),
        // borderWidth: 1.5,
        // borderColor:'#002B19'
    },
    createCategoryText: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize:hp('2.35%'),
        color: '#407565',
    },
    subMenuText: {
        fontFamily: 'PierSans-Regular',
        textAlign: 'center',
        fontSize: hp('2.5%'),
        paddingTop: hp('1%'),
        paddingBottom: hp('1%'),
        marginTop: hp('1%'),
        color: 'white',
        backgroundColor: '#407565',
    },
    input: {
        height: hp('6%'),
        width: wp('65%'),
        margin: hp('1.2%'),
        borderColor: '#002B19',
        borderWidth: hp('0.1%'),
        color: 'black',
        alignContent: 'center',
        backgroundColor: 'white',
        paddingBottom: hp('1%'),
        marginBottom: hp('1%'),
        textAlign: 'center',
        borderRadius: hp('1.5%')
    },
    submitStyling: {
        paddingTop: hp('2%'),
    }
})
