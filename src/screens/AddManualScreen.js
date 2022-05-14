import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../context/AuthContext';

const AddManualScreen = ({route, navigation}) => {
  const [section1, setSection] = useState();
  const [title1, setTitle] = useState();
  const [content1, setContent] = useState();
  const [sectionNumber1, setsectionNumber1] = useState();
  const [typeOfUser, setTypeOfUser] = useState();
  const {user, setUser, logout} = useContext(AuthContext);
  const {sectionNumber, subsectionId, title, content} = route.params;
  const [loading, setLoading] = useState(true);

  const handleSave = () => {
    firestore()
      .collection('mainSection')
      .doc(sectionNumber)
      .collection('subSection')
      .doc(section1)
      .set({
        content: content1,
        title: title1,
      })
      .then(() => {
        console.log('Section Added!');

        Alert.alert(
          'Section added!',
          'Your section has been added Successfully!',
        );
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const handleDelete = () => {
    firestore()
      .collection('mainSection')
      .doc(sectionNumber)
      .collection('subSection')
      .doc(section1)
      .delete()
      .then(() => {
        Alert.alert(
          'Section deleted!',
          'Your section has been deleted Successfully!',
        );

        navigation.navigate('Home');
      });
  };

  useEffect(() => {
    setSection(subsectionId);
    setTitle(title);
    setContent(content);
    setsectionNumber1(sectionNumber);

    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          const {typeofUser} = documentSnapshot.data();
          setTypeOfUser(typeofUser);
        }
      });
    console.log('line 82', typeOfUser);
    if (loading) {
      setLoading(false);
    }
  };

  return (
    <ScrollView>
      <View>
        <CustomInput
          value={section1}
          textName="Section"
          onChangeText={text => setSection(text)}
        />
        <CustomInput
          textName="Title"
          value={title1}
          onChangeText={text => setTitle(text)}
        />
        <CustomInput
          value={content1}
          typeOfInput="multiline"
          numberOfLines={10}
          textName="Content"
          onChangeText={text => setContent(text)}
        />

        {typeOfUser == 'admin' ? (
          <>
            <CustomButton
              textName="Save"
              backgroundColor="#3E4684"
              onPress={handleSave}
            />
            <CustomButton
              textName="Delete"
              backgroundColor="#B20600"
              onPress={handleDelete}
            />
          </>
        ) : (
          <></>
        )}
      </View>
    </ScrollView>
  );
};

export default AddManualScreen;

const styles = StyleSheet.create({
  continer: {
    backgroundColor: '#F1F6FE',
    flex: 1,
    padding: 10,
  },
});
