import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fetchLoanDetail} from '../../Redux/Slices/LoanSlice/LoanAddSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const LoanDetailPage = ({route, navigation}) => {
  const {loanId} = route.params;
  console.log('SDF===>', loanId);
  const dispatch = useDispatch();

  const {loan, loading, error} = useSelector(state => state.Loan);
  const formattedDate = new Date(loan?.createdAt).toLocaleDateString('en-CA');

  useEffect(() => {
    dispatch(fetchLoanDetail(loanId));
    console.log('loan----------->', loan);
  }, [dispatch, loanId]);

  if (loading) {
    return <Text style={styles.loadingText}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <View style={styles.container}>
        {loan ? (
          <>
            <Text style={styles.title}>{loan.name}</Text>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Amount:</Text>
              <Text style={styles.value}>₹{loan.amount}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Interest Rate:</Text>
              <Text style={styles.value}>{loan.interestRate}%</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Duration:</Text>
              <Text style={styles.value}>{loan.duration} months</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Borrower:</Text>
              <Text style={styles.value}>{loan.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Description:</Text>
              <Text style={styles.value}>{loan.description}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Mobile No:</Text>
              <Text style={styles.value}>{loan.mobileNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Agreement:</Text>
              <Text style={styles.value}>{loan.agreement}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Created at:</Text>
              <Text style={styles.value}>{formattedDate}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Aadhaar NO:</Text>
              <Text style={styles.value}>{loan.aadhaarNumber}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Address:</Text>
              <Text style={styles.value}>{loan.address}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.label}>Digital Signature:</Text>
              <Text style={styles.value}>{loan.digitalSignature}</Text>
            </View>
          </>
        ) : (
          <Text style={styles.errorText}>Loan not found.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('5%'),
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('2%'),
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  label: {
    fontSize: hp('2.5%'),
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#555',
  },
  value: {
    fontSize: hp('2.5%'),
    flex: 1,
    marginLeft: wp('5%'),
    color: '#000',
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
  backButton: {
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
  },
});

export default LoanDetailPage;
