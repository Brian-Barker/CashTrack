import {Dimensions, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

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
    //backgroundColor:'#aabaaf'
    //backgroundColor: '#18191A',
    //backgroundColor: '#92c6ba',
    //backgroundColor: '#002B19', //Highland
    //backgroundColor: '#b2decf', //SurfnTurf
    //backgroundColor: '#c0e0d5', //RobinsNest
    //backgroundColor: '#d8ede6', //SpringMint
    backgroundColor: '#E5FAF3',
    //backgroundColor: 'white'
  },
  topbar: {
    height: hp('7%'),
    width: wp('100%'),
    backgroundColor: '#5d5d5d',
    elevation: 3,
  },
  HeaderText: {
    textAlign: 'center',
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
    width: width * 0.8,
    marginVertical: height * 0.01,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // alignContent:'center',
    alignSelf:'center',
    borderRadius: 5,
    //backgroundColor: 'black',
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    //borderColor:'black',
    borderColor: '#002B19',
  },

  CurrentTab: {
    fontSize: hp('3%'),
    fontFamily: 'PierSans-Bold',
    color: 'black',
    alignSelf: 'center',
    marginTop: hp('2%'),
  },

  OverallInfo: {
    height: hp('15%'),
    width: hp('50%'),
    borderRadius: hp('1%'),
    borderWidth: 1,
    backgroundColor: '#18191A',
    marginTop: '5%',
    alignItems: 'flex-start',
  },
  overallMainInfoText: {
    fontSize: hp('2%'),
    textAlign: 'center',
  },
  windowsContainer: {
    backgroundColor: '#18191A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  information: {
    height: hp('30%'),
    width: hp('50%'),
    borderRadius: hp('4%'),
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    marginTop: '5%',
    alignItems: 'flex-start',
  },
  navBarBottom: {
    height: hp('15%'),
    width: wp('100%'),
    backgroundColor: '#5d5d5d',
  },
  dashboardContainer: {
    height: hp('50%'),
    width: wp('100%'),
    backgroundColor: '#E5FAF3',
  },

  monthlySpendingContainer: {
    alignItems: 'center',
    height: hp('32%'),
    width: wp('85%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: hp('1.5%'),
    marginTop: hp('1%'),
    marginBottom: hp('1.75%'),
  },
  OverallInfoHeaderText: {
    fontSize: hp('3%'),
    marginLeft: hp('2%'),
    marginTop: hp('1%'),
    color: '#002B19',
    alignSelf: 'center',
    fontFamily: 'PierSans-Regular',
  },
  remainingBalanceContainer: {
    height: hp('23%'),
    width: wp('100%'),
    backgroundColor: '#407565',
    alignSelf: 'center',
    marginBottom: hp('1.75%'),
  },
  RemainingBalanceHeaderText: {
    fontSize: hp('2.75%'),
    marginTop: hp('1%'),
    color: 'white',
    fontFamily: 'PierSans-Regular',
    paddingTop: hp('1%'),
    paddingLeft: hp('3%'),
  },
  overallLeftOverBudgetGreen: {
    fontSize: hp('4.25%'),
    marginTop: hp('1%'),
    color: 'white',
    paddingLeft: hp('3%'),
    paddingBottom: hp('1.75%'),
  },
  recentPurchasesContainer: {
    alignItems:'center',
    width:wp('85%'),
    backgroundColor:'white',
    justifyContent:'center',
    alignSelf:'center',
    borderRadius:hp('1.5%'),
    marginTop:hp('1.75%'),
    marginBottom: hp('12%'),
  },
  RecentPurchsesHeaderText: 
  {
    alignSelf:'center',
    color:'#002B19',
    fontSize: hp('3%'),
    fontFamily: 'PierSans-Regular',
    marginTop: hp('1%'),
  },
});

export default styles;
