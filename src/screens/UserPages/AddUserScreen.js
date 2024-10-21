import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {addLoan} from '../../Redux/Slices/LoanSlice/LoanAddSlice';

const AddUserScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loan} = useSelector(state => state.Loan);

  const initialFormData = {
    name: '',
    loanPersoneName: '',
    aadhaarNumber: '',
    mobileNumber: '',
    address: '',
    amount: '',
    agreement: '',
    digitalSignature: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});

  // Handle form field change
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Validation logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (formData.aadhaarNumber.length !== 12) {
      newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
      isValid = false;
    }

    if (formData.mobileNumber.length !== 10) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!formData.amount.trim() || isNaN(formData.amount)) {
      newErrors.amount = 'Loan amount must be a valid number';
      isValid = false;
    }

    if (!formData.agreement.trim()) {
      newErrors.agreement = 'Agreement details are required';
      isValid = false;
    }

    if (!formData.digitalSignature.trim()) {
      newErrors.digitalSignature = 'Digital signature is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle Add User
  const handleAddUser = () => {
    if (validateForm()) {
      console.log('user add data', formData);
      dispatch(addLoan(formData));
      Alert.alert('User added successfully');
      setFormData(initialFormData);
      // navigation.navigate('get-allLoans-User');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add User</Text>

      {/* Name Input */}
      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Enter Lone Officer name"
        value={formData.name}
        onChangeText={value => handleInputChange('name', value)}
        autoCapitalize="words"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={[styles.input, errors.name && styles.errorInput]}
        placeholder="Enter name"
        value={formData.loanPersoneName}
        onChangeText={value => handleInputChange('loanPersoneName', value)}
        autoCapitalize="words"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      {/* Aadhaar Card Number Input */}
      <TextInput
        style={[styles.input, errors.aadhaarNumber && styles.errorInput]}
        placeholder="Enter Aadhaar Number"
        value={formData.aadhaarNumber}
        onChangeText={value => handleInputChange('aadhaarNumber', value)}
        keyboardType="numeric"
        maxLength={12}
      />
      {errors.aadhaarNumber && (
        <Text style={styles.errorText}>{errors.aadhaarNumber}</Text>
      )}

      {/* Mobile Number Input */}
      <TextInput
        style={[styles.input, errors.mobileNumber && styles.errorInput]}
        placeholder="Enter Mobile Number"
        value={formData.mobileNumber}
        onChangeText={value => handleInputChange('mobileNumber', value)}
        keyboardType="numeric"
        maxLength={10}
      />
      {errors.mobileNumber && (
        <Text style={styles.errorText}>{errors.mobileNumber}</Text>
      )}

      {/* Address Input */}
      <TextInput
        style={[styles.input, errors.address && styles.errorInput]}
        placeholder="Enter Address"
        value={formData.address}
        onChangeText={value => handleInputChange('address', value)}
        multiline
      />
      {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}

      {/* Amount Input */}
      <TextInput
        style={[styles.input, errors.amount && styles.errorInput]}
        placeholder="Enter Loan Amount"
        value={formData.amount}
        onChangeText={value => handleInputChange('amount', value)}
        keyboardType="numeric"
      />
      {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}

      {/* Agreement Input */}
      <TextInput
        style={[styles.input, errors.agreement && styles.errorInput]}
        placeholder="Enter Agreement Details"
        value={formData.agreement}
        onChangeText={value => handleInputChange('agreement', value)}
        multiline
      />
      {errors.agreement && (
        <Text style={styles.errorText}>{errors.agreement}</Text>
      )}

      {/* Digital Signature Input */}
      <TextInput
        style={[styles.input, errors.digitalSignature && styles.errorInput]}
        placeholder="Digital Signature"
        value={formData.digitalSignature}
        onChangeText={value => handleInputChange('digitalSignature', value)}
      />
      {errors.digitalSignature && (
        <Text style={styles.errorText}>{errors.digitalSignature}</Text>
      )}

      {/* Add User Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.addButtonText}>Add User</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles for the Add User Screen
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: wp('5%'),
  },
  title: {
    fontSize: hp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('5%'),
    color: '#333',
  },
  input: {
    width: '100%',
    height: hp('7%'),
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: wp('2%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginBottom: hp('1%'),
    fontSize: hp('2%'),
  },
  addButton: {
    backgroundColor: '#3B71F3',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 8,
    marginTop: hp('2%'),
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
});

export default AddUserScreen;
