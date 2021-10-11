import {Dimensions, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const {height, width} = Dimensions.get('window');

let styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingScreenContainer: {
    height: height * 0.2,
    justifyContent: 'space-evenly',
  },
  loadingText: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#18191A',
  },
  topbar: {
    height: hp('7%'),
    width: wp('100%'),
    backgroundColor: '#5d5d5d',
    elevation: 3,
  },
  HeaderText: {
    textAlign:'center',
    color: 'white',
    fontSize: hp('5%'),
    fontFamily: 'PierSans-Bold',
  },
  homeSummaryView: {
    flex: 1.15,
    width: '100%',
    backgroundColor: '#18191A',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 5,
  },
  homeSummaryHeaderPhotoView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
  },
  homeSummaryHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 36,
  },
  homeSummaryPhotoView: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
  },
  homeSummaryAllowanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
  },
  homeSummaryAllowanceText: {
    color: 'white',
    fontSize: 20,
  },
  homeSummaryAllowanceTextSmall: {
    color: '#EEEEEE',
    fontSize: 16,
    marginVertical: height * 0.005,
  },
  homeSummaryAllowanceTextBold: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  homeTransactionView: {
    flex: 2,
    width: width * 0.9,
    backgroundColor: 'white',
    marginVertical: height * 0.015,
    borderRadius: 10,
    alignItems: 'center',
    //justifyContent: 'center',
    elevation: 5,
  },
  homeTransactionViewHeader: {
    marginVertical: height * 0.015,
    fontWeight: 'bold',
  },
  transactionContainer: {
    height: height * 0.07,
    width: width * 0.9,
    marginVertical: height * 0.01,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#18191A',
    paddingLeft: 20
  },

  OverallInfo:
  {
    height: hp('15%'),
    width: hp('50%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
    backgroundColor: '#18191A',
    marginTop:('5%'),
    alignItems:'flex-start'
  },
  OverallInfoHeaderText:
  {
    fontFamily:'play',
    fontSize: hp('3.8%'),
    marginLeft:hp('2%'),
    color:'white',
    alignSelf:'center',
    fontFamily: 'PierSans-Regular'
  },
  RecentPurchsesHeaderText:
  {
    fontFamily:'play',
    fontSize: hp('3.8%'),
    marginLeft:hp('2%'),
    color:'white',
    alignSelf:'center',
    fontFamily: 'PierSans-Regular',
    paddingTop: 50
  },
  overallMainInfoText:
  {
    fontFamily:'play',
    fontSize:hp('2%'),
    textAlign:'center'
  },
  overallLeftOverBudgetGreen:
  {
    fontFamily:'play',
    fontSize:hp('5%'),
    alignSelf:'center',
    paddingBottom:hp('4%'),
    color: '#28C900'
  },

  windowsContainer:
  {
    backgroundColor:'#18191A',
    justifyContent:'center',
    alignItems:'center'

  },
  information:
  {
    height: hp('30%'),
    width: hp('50%'),
    borderRadius: hp('4%'),
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    marginTop:('5%'),
    alignItems:'flex-start'
  },




});

export default styles;
