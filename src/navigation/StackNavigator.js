import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import LoginScreen from '../screens/LoginPages/LoginScreen';
import SignUpScreen from '../screens/LoginPages/SignUpScreen';
import ForgetPassword from '../screens/LoginPages/ForgetPassword';
import AddUserScreen from '../screens/UserPages/AddUserScreen';
import TabNavigator from './TabNavigator';
import GetAllLoan from '../screens/UserPages/GetAllLoan';
import LoanDetailPage from '../screens/UserPages/LoanDetailPage';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={TabNavigator}
      />
      {/* <Stack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginScreen}
      /> */}
      <Stack.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="ForgetPassword"
        component={ForgetPassword}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="AddUser"
        component={AddUserScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => (
            <Icon
              name="arrow-back"
              size={25}
              color="#333"
              style={{marginLeft: 1}}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
        name="GetAllLoan"
        component={GetAllLoan}
      />
      <Stack.Screen
        name="LoanDetailPage"
        component={LoanDetailPage}
        options={{headerShown: false}}
      />

      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
