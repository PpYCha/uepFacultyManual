import {StyleSheet, Text, View, TextInput} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';

import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddManualScreen from '../screens/AddManualScreen';
import SectionScreen from '../screens/SectionScreen';
import SectionListScreen from '../screens/SectionListScreen';
import Dialog from 'react-native-dialog';
import AddMainSection from '../screens/AddMainSection';
import UpdateManualScreen from '../components/UpdateManualScreen';
import firestore from '@react-native-firebase/firestore';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {AuthContext} from '../context/AuthContext';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({navigation}) => ({
        title: 'Faculty Manual',

        headerRight: () => (
          <View style={styles.headerRight}>
            <Ionicons.Button
              name="add-outline"
              size={30}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('AddMainSection')}
            />
          </View>
        ),
        // headerLeft: () => (
        //   <View style={styles.headerLeft}>
        //     <Ionicons.Button
        //       name="search-outline"
        //       size={30}
        //       backgroundColor="#fff"
        //       color="#2e64e5"
        //       onPress={() => {}}
        //       style={styles.searchIcon}
        //     />
        //     <TextInput style={styles.input} />
        //   </View>
        // ),
      })}
    />
    <Stack.Screen
      name="AddManualScreen"
      component={AddManualScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SectionScreen"
      component={SectionScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="UpdateManualScreen"
      component={UpdateManualScreen}
      options={{
        headerShown: false,
      }}
    />
    {/* <Stack.Screen
      name="UserScreen"
      component={UserScreen}
      options={{
        headerShown: false,
      }}
    /> */}
    <Stack.Screen
      name="SectionListScreen"
      component={SectionListScreen}
      options={({navigation}) => ({
        title: 'Sub Section',
        headerRight: () => (
          <View>
            <Ionicons.Button
              name="add-outline"
              size={30}
              backgroundColor="#fff"
              color="#2e64e5"
              onPress={() => navigation.navigate('UpdateManualScreen', {})}
            />
          </View>
        ),
      })}
    />

    <Stack.Screen
      name="AddMainSection"
      component={AddMainSection}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const UserHomeStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={({navigation}) => ({
        title: 'Faculty Manual',
      })}
    />
    <Stack.Screen
      name="AddManualScreen"
      component={AddManualScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SectionScreen"
      component={SectionScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="UpdateManualScreen"
      component={UpdateManualScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="SectionListScreen"
      component={SectionListScreen}
      options={({navigation}) => ({
        title: 'Sub Section',
      })}
    />

    <Stack.Screen
      name="AddMainSection"
      component={AddMainSection}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const SearchStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const Navigation = () => {
  const {user, setUser, logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [typeOfUser, setTypeOfUser] = useState('');
  const [userData, setUserData] = useState('');

  const getUserDetails = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
          console.log('User Data', documentSnapshot.data());
          const {typeofUser} = documentSnapshot.data();
          setTypeOfUser(typeofUser);
        }
      });
    console.log(typeOfUser);
    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [loading]);

  const LogoutStack = () => {
    logout();
    return null;
  };

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeTintColor: '#2e64e5',
      }}>
      {typeOfUser == 'admin' ? (
        <>
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={({route}) => ({
              tabBarLabel: 'Home',
              // tabBarVisible: route.state && route.state.index === 0,
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              ),
            })}
          />

          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={({route}) => ({
              tabBarLabel: 'Users',
              // tabBarVisible: route.state && route.state.index === 0,
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="head-outline"
                  color={color}
                  size={size}
                />
              ),
            })}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="Home"
            component={UserHomeStack}
            options={({route}) => ({
              tabBarLabel: 'Home',
              // tabBarVisible: route.state && route.state.index === 0,
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="home-outline"
                  color={color}
                  size={size}
                />
              ),
            })}
          />
        </>
      )}
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={({route}) => ({
          tabBarLabel: 'Search',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="text-search"
              color={color}
              size={size}
            />
          ),
        })}
      />
      <Tab.Screen
        name="LogoutScreen"
        component={LogoutStack}
        options={({route}) => ({
          tabBarLabel: 'Sign Out',
          // tabBarVisible: route.state && route.state.index === 0,
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F6FE',
    width: '50%',
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#F1F6FE',
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#F1F6FE',
    color: '#424242',
  },
  headerRight: {},
});
