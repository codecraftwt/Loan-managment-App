import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AddUserScreen from '../screens/UserPages/AddUserScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../screens/LoginPages/LoginScreen';
import GetAllLoans from '../screens/UserPages/GetAllLoan';
import GetAllLoan from '../screens/UserPages/GetAllLoan';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'AddUser1') {
            iconName = 'user-plus';
          } else if (route.name === 'Login') {
            iconName = 'user';
          } else if (route.name === 'GetAllLoan') {
            iconName = 'list';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
      options={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: '#3B71F3',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        options={{headerShown: false}}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        name="AddUser1"
        component={AddUserScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Login"
        options={{headerShown: false}}
        component={LoginScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name="GetAllLoan"
        component={GetAllLoan}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
