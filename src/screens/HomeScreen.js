import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import {PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const loanData = [
    {id: '1', loanType: 'Home Loan', amount: 500000, color: '#FF6347'},
    {id: '2', loanType: 'Car Loan', amount: 700000, color: '#4682B4'},
    {id: '3', loanType: 'Personal Loan', amount: 100000, color: '#32CD32'},
    {id: '4', loanType: 'Education Loan', amount: 300000, color: '#FFD700'},
  ];

  const chartData = loanData.map(loan => ({
    name: loan.loanType,
    amount: loan.amount,
    color: loan.color,
    legendFontColor: '#333',
    legendFontSize: 12,
  }));

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: hp('3%'),
          gap: 10,
        }}>
        <Icon name="money" size={30} color={'blue'}></Icon>
        <Text style={styles.title}>Loan Management</Text>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Total Loans Overview</Text>
        <View style={styles.pieChartContainer}>
          <PieChart
            data={chartData}
            width={wp('100%')}
            height={hp('20%')}
            accessor="amount"
            backgroundColor="transparent"
            // absolute
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
                gap: -10,
              },
            }}
            style={{
              alignSelf: 'center',
              gap: -10,
            }}
          />
        </View>
      </View>

      {/* Loan List */}
      <View style={styles.loanListContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: hp('2%'),
            justifyContent: 'space-between',
          }}>
          <Text style={styles.loanListTitle}>Loans List</Text>
          <Pressable
            onPress={() => navigation.navigate('GetAllLoan')}
            style={{flexDirection: 'row', alignItems: 'center', gap: wp('2%')}}>
            <Text>See all</Text>
            <Icon name="long-arrow-right" size={25}></Icon>
          </Pressable>
        </View>
        {loanData.map(loan => (
          <TouchableOpacity key={loan.id} style={styles.loanItem}>
            <Icons name="cash-outline" size={30} color={loan.color} />
            <View style={styles.loanInfo}>
              <Text style={styles.loanType}>{loan.loanType}</Text>
              <Text style={styles.loanAmount}>
                ₹{loan.amount.toLocaleString()}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles for the Home Screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: wp('5%'),
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#333',
  },
  summaryContainer: {
    marginBottom: hp('3%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('5%'),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  pieChartContainer: {
    position: 'relative',
    alignItems: 'center',
    width: wp('80%'),
    justifyContent: 'center',
    flex: 1,
  },
  legendContainer: {
    marginTop: hp('2%'),
    alignItems: 'center', // Center legend horizontally
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  legendColor: {
    width: wp('4%'),
    height: hp('2%'),
    marginRight: wp('2%'),
    borderRadius: 4,
  },
  legendText: {
    fontSize: hp('2.3%'),
    color: '#333',
  },
  loanListContainer: {
    marginVertical: hp('3%'),
  },
  loanListTitle: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    color: '#333',
    // marginBottom: hp('2%'),
  },
  loanItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: hp('2%'),
    marginBottom: hp('1%'),
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  loanInfo: {
    marginLeft: wp('5%'),
  },
  loanType: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  loanAmount: {
    fontSize: hp('2.3%'),
    color: '#777',
  },
});

export default HomeScreen;
