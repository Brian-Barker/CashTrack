import React, {useState, useEffect} from "react";
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

import { requestWithToken} from "../apis/Backend.js";

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
    const [newCategoryBudget, setNewCategoryBudget] = React.useState(null);
    const [selectedValue, setSelectedValue] = React.useState(null);
    const [updateCategories, setUpdateCategories] = React.useState(true);
    const [allCategories, setAllCategories] = React.useState([]);
    const [topFourCategories, setTopFourCategories] = React.useState([]);
    const [updateTopFourCategories, setUpdateTopFourCategories] = useState(false);

    useEffect(() => {
        if (updateCategories) {
            setUpdateCategories(false);
            fetchCategories();
        }
        if (updateTopFourCategories && allCategories.childCategories) {
            setUpdateTopFourCategories(false);
            getTopFourCategories();
        }
    });

    let [isModalVisible, setModalVisible] = useState(false);

    function toggleModal() {
        setModalVisible(!isModalVisible);
    }

    function fetchCategories() {
        requestWithToken("categories/getCategoriesFromToken", {})
        .then((res) => {
            let cats = {
                budget: res.category,
                childCategories: res.childCategories
            }
            setAllCategories(cats);
            setSelectedValue(res.category._id);
            setUpdateTopFourCategories(true);
        });
    }

    function getTopFourCategories() {
        let top4 = [];
        allCategories.childCategories.forEach(cat => {
            for (let i = 0; i < 4; ++i) {
                if ((!top4[i] || cat.category.budget > top4[i].category.budget) && cat.category.budget > 0) {
                    top4.splice(i, 0, cat);
                    break;
                }
            }
        });
        if (top4.length === 0) {
            top4.push({
                category: {
                    name: "Nothing To Show",
                    budget: 0,
                    pieColor: '#7BBCA9',
                }
            })
        }
        top4.length = Math.min(4, top4.length);
        if (top4[0]) top4[0].category.pieColor = '#7BBCA9';
        if (top4[1]) top4[1].category.pieColor = '#A1E2CF';
        if (top4[2]) top4[2].category.pieColor = '#2E6F5C';
        if (top4[3]) top4[3].category.pieColor = '#559683';
        console.log(top4[0].category.pieColor);
        setTopFourCategories(top4);
    }

    function getFieldFromCategories(key) {
        let fields = [];
        if (allCategories.budget) {
            for (let i = 0; i < allCategories.childCategories.length; ++i) {
                fields.push(allCategories.childCategories[i].category[key]);
            }
        }
        return fields;
    }

    function handleCreateCategory(e) {
        console.log(text)
        console.log(selectedValue)
        console.log(newCategoryBudget)
        requestWithToken("categories/create", {
            name: text,
            parentId: selectedValue,
            budget: newCategoryBudget,
        }).then((res) => {
            console.log(res)
            onChangeText(null);
            setNewCategoryBudget(null);
            setSelectedValue(allCategories.budget._id);
            fetchCategories();
            toggleModal();
        })
    }

    return (

        <View style={styles.container}>

            <Animated.View style={styles.pieChartContainer}>
                    <Text style={styles.pieChartHeader}>
                        Expense Breakdown
                    </Text>

                    <PieChart
                        data={topFourCategories[0] ? topFourCategories.map((item) => {
                            return ({
                                name: item.category.name,
                                percentage: item.category.budget,
                                color: item.category.pieColor,
                                legendFontColor: '#002B19',
                                legendFontSize: 15,
                            })
                        }) : [
                            {
                                name: 'Groceries',
                                percentage: 21,
                                color: '#7BBCA9',
                                legendFontColor: '#002B19',
                                legendFontSize: 15,
                            }
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
                    //Brian --Done
                    data={getFieldFromCategories("name")}
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
                                onPress={() => navigation.navigate('CategoricTransactions')}
                            >
                                {item}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    )}
                />

                {/* Brian -- done */}
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
                        onBackdropPress={ () => toggleModal() }
                        isVisible={isModalVisible}
                        animationIn='fadeIn'
                        animationOut='fadeOut'
                    >
                        <View style={{
                            backgroundColor:'#407565',
                            height: hp('55%'),
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
                                New Category Budget
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setNewCategoryBudget}
                                value={newCategoryBudget}
                                placeholder="New Category Budget"
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
                                <Picker.Item label={"None"} value={allCategories.budget ? allCategories.budget._id : null} key={allCategories.budget ? allCategories.budget._id : null}/>
                                {allCategories.childCategories ? allCategories.childCategories.map((item) => {
                                    return (<Picker.Item label={item.category.name} value={item.category._id} key={item.category._id}/>) //if you have a bunch of keys value pair
                                }) : null}
                            </Picker>

                            <TouchableOpacity style={styles.submitStyling} onPress={toggleModal}>
                                <Text
                                    onPress={handleCreateCategory}
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