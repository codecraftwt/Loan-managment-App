import React, {useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteLoan,
  fetchLoans,
} from '../../Redux/Slices/LoanSlice/LoanAddSlice';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const GetAllLoan = ({navigation}) => {
  const dispatch = useDispatch();
  const {loans, loading, error} = useSelector(state => state.Loan);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchLoans());
    }, [dispatch]),
  );
  const onHandleDelete = loanId => {
    // dispatch()
    dispatch(deleteLoan(loanId));
  };

  const renderLoanItem = ({item}) => (
    <TouchableOpacity
      style={styles.loanItem}
      onPress={() => navigation.navigate('LoanDetailPage', {loanId: item._id})}>
      <View style={styles.loanTextContainer}>
        <Text style={styles.loanType}>{item.name}</Text>
      </View>
      <View style={styles.loanTextContainer}>
        <Text style={styles.loanAmount}>₹{item.amount}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <Icon name="edit" size={25} color="blue" style={styles.icon} />
        <TouchableOpacity onPress={onHandleDelete(item._id)}>
          <Icon name="trash" size={25} color="red" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Loans</Text>
      <View>
        {/* Header Row */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Amount</Text>
          <Text style={styles.headerText}>Actions</Text>
        </View>
        <FlatList
          data={loans}
          renderItem={renderLoanItem}
          keyExtractor={item => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: wp('5%'),
    marginBottom: hp('10%'),
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('3%'),
  },
  loadingText: {
    fontSize: hp('2.5%'),
    color: '#777',
    textAlign: 'center',
    marginTop: hp('5%'),
  },
  errorText: {
    fontSize: hp('2.5%'),
    color: 'red',
    textAlign: 'center',
    marginTop: hp('5%'),
  },
  flatListContainer: {
    paddingBottom: hp('5%'),
  },
  loanItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  loanTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loanType: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  loanAmount: {
    fontSize: hp('2.5%'),
    color: '#777',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
  },
  icon: {
    marginLeft: wp('5%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: hp('2.3%'),
  },
});

export default GetAllLoan;
