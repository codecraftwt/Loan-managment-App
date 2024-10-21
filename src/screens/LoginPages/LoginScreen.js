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
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../../Redux/Slices/AuthSlice/authSlice';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {loading, error} = useSelector(state => state.auth);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Please fill in all fields');
    } else {
      console.log('Logging in with:', email, password);

      try {
        const actionResult = await dispatch(signIn({email, password}));

        if (signIn.fulfilled.match(actionResult)) {
          Alert.alert('Login Successful');
          navigation.navigate('AddUser1');
        } else {
          Alert.alert('Login Failed', actionResult.error.message);
        }
      } catch (error) {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        console.error('Login error:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Text style={styles.fieldName}>Email :-</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.fieldName}>Password :-</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      {/* <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity> */}
      <Button title={'Login'} onPress={handleLogin}></Button>

      <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
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
  loginButton: {
    backgroundColor: '#3B71F3',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 8,
    marginTop: hp('2%'),
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#3B71F3',
    textAlign: 'center',
    marginTop: hp('2%'),
    fontSize: hp('2%'),
  },
  signUpContainer: {
    flexDirection: 'row',
    // textAlign: 'center',
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  signUpText: {
    fontSize: hp('2%'),
    color: '#333',
  },
  signUpLink: {
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

export default LoginScreen;
