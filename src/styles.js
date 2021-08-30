import {Dimensions, StyleSheet} from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8ff',
  },
  homeSummaryView: {
    flex: 1.15,
    width: '100%',
    backgroundColor: '#4f08aa',
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
    // justifyContent: 'center',
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
    justifyContent: 'space-evenly',
    borderRadius: 5,
    backgroundColor: 'white',
  },
});

export default styles;
