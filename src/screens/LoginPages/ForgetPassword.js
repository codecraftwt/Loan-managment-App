import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';

const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = () => {
    if (email === '') {
      Alert.alert('Please enter your email');
    } else {
      // Perform password reset logic here (e.g., send a password reset email)
      Alert.alert('Password reset link sent to your email');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email address to receive a password reset link.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* <TouchableOpacity
        style={styles.resetButton}
        onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity> */}
      <Button title={'Send Reset Link'} onPress={handlePasswordReset}></Button>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Remembered your password? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: wp('5%'),
  },
  title: {
    fontSize: hp('5%'),
    fontWeight: 'bold',
    marginBottom: hp('3%'),
    color: '#333',
  },
  subtitle: {
    fontSize: hp('2%'),
    marginBottom: hp('3%'),
    textAlign: 'center',
    color: '#666',
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
  resetButton: {
    backgroundColor: '#3B71F3',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 8,
    marginTop: hp('2%'),
    width: '100%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
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
});

export default ForgetPassword;
