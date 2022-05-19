import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const ProfileScreen = ({navigation}) => {
  const [users, setUsers] = useState();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const list = [];
      await firestore()
        .collection('users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const id = doc.id;
            const {
              contact,
              course,
              date,
              email,
              fullname,
              isActive,
              typeofUser,
              userImg,
            } = doc.data();
            list.push({
              contact,
              course,
              date,
              email,
              fullname,
              isActive,
              typeofUser,
              userImg,
              id,
            });
          });
        });

      setUsers(list);
      console.log('data:', list);
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('UserScreen');
        }}>
        <Text style={styles.name}>{item.fullname}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      {/* <CustomButton textName="Logout" onPress={() => logout()} /> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F6FE',
    padding: 5,
    flex: 1,
    color: 'black',
  },
  name: {
    color: 'black',
  },
});
