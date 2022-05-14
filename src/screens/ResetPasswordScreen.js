import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../context/AuthContext';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState();
  const {resetPassword} = useContext(AuthContext);
  return (
    <View>
      <CustomInput
        iconName="mail-outline"
        textName="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <CustomButton
        textName="Send Reset Password Link"
        backgroundColor="#3E4684"
        onPress={() => {
          if (email != '') {
            resetPassword(email);
            console.log('if login pressed');
          } else {
            Alert.alert('Please input your  email');
            console.log('else login pressed');
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F6FE',
    flex: 1,
    padding: 10,
  },
  top: {
    padding: 10,
    marginBottom: 20,
    alignContent: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
  },
  bottom: {
    padding: 10,
  },
});
