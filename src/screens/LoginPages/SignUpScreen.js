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
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../../Redux/Slices/AuthSlice/authSlice';

const SignUpScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');

  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);

  // Handle SignUp Button Press
  const handleSignUp = async () => {
    if (
      name === '' ||
      email === '' ||
      address === '' ||
      password === '' ||
      aadhaarNumber === ''
    ) {
      Alert.alert('Please fill in all fields');
    } else if (aadhaarNumber.length !== 12) {
      Alert.alert('Aadhaar number must be 12 digits');
    } else {
      try {
        console.log(name, email, address, password, aadhaarNumber);
        const response = await dispatch(
          signUp({
            userName: name,
            email,
            address,
            password,
            aadharCardNo: aadhaarNumber,
          }),
        );

        if (signUp.fulfilled.match(response)) {
          Alert.alert('Sign Up Successful');
          setName('');
          setEmail('');
          setAddress('');
          setPassword('');
          setAadhaarNumber('');
          navigation.navigate('Login');
        }
      } catch (err) {
        Alert.alert(
          'Sign Up Error',
          error || 'An error occurred during signup',
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Sign Up</Text>

        <Text style={styles.fieldName}>Name :-</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.fieldName}>Email :-</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.fieldName}>Address :-</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
          autoCapitalize="none"
        />

        {/* Password Input */}
        <Text style={styles.fieldName}>password :-</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        {/* Aadhaar Number Input */}
        <Text style={styles.fieldName}>AadhaarNumber :-</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your Aadhaar Number"
          value={aadhaarNumber}
          onChangeText={setAadhaarNumber}
          keyboardType="numeric"
          maxLength={12}
        />

        {/* <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity> */}
        <Button title={'Sign Up'} onPress={handleSignUp}></Button>

        {/* Navigate to Login Option */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F0F0F0',
    // padding: wp('5%'),
    paddingHorizontal: wp('5%'),
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
  signUpButton: {
    backgroundColor: '#3B71F3',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 8,
    marginTop: hp('2%'),
    width: '100%',
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  loginText: {
    fontSize: hp('2%'),
    color: '#333',
  },
  loginLink: {
    fontSize: hp('2%'),
    color: '#3B71F3',
    fontWeight: 'bold',
  },
  fieldName: {
    textAlign: 'left',
    fontWeight: '700',
    justifyContent: 'flex-end',
    paddingVertical: wp('1%'),
  },
});

export default SignUpScreen;
