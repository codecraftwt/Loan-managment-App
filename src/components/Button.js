// components/LoginButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Button = ({onPress, title}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3B71F3',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('20%'),
    borderRadius: 8,
    marginTop: hp('2%'),
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
  },
});

export default Button;
