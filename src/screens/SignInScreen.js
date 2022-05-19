import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import {AuthContext} from '../context/AuthContext';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  const handleLogin = () => {
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.headerText}>UEP FACULTY MANUAL ANDROID</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 165,
              height: 165,
            }}
            source={require('../assets/download.png')}
          />
        </View>
        <CustomInput
          iconName="mail-outline"
          textName="Email Address"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <CustomInput
          iconName="ios-lock-closed-outline"
          textName="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
        <CustomButton
          textName="Login"
          backgroundColor="#3E4684"
          onPress={() => {
            if (email != '' || password != '') {
              login(email, password);
              console.log('if login pressed');
            } else {
              Alert.alert('Please input your password or email');
              console.log('else login pressed');
            }
          }}
        />
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUpScreen');
            }}>
            <Text style={styles.sign}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ResetPasswordScreen');
            }}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F6FE',
    flex: 1,
    padding: 10,
  },
  top: {
    padding: 10,
    marginBottom: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 40,
    fontWeight: '900',
    textAlign: 'center',
    color: 'black',
  },
  bottom: {
    padding: 10,
  },
  forgot: {
    color: 'black',
  },
  sign: {
    color: 'black',
  },
});
