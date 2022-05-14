import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import {SectionContext} from '../context/SectionContext';
import firestore from '@react-native-firebase/firestore';

const UpdateManualScreen = ({route, navigation}) => {
  const [section1, setSection] = useState();
  const [title1, setTitle] = useState();
  const [content1, setContent] = useState();
  const [mainSection, setMainSection] = useState();

  const {sectionNumber} = route.params;

  const handleSave = async () => {
    // const mainSection = await firestore()
    //   .collection('mainSection')
    //   .get()
    //   .then(querySnapshot => {
    //     console.log('total sections: ', querySnapshot.size);
    //     querySnapshot.forEach(documentSnapshot => {
    //       console.log(
    //         'User ID: ',
    //         documentSnapshot.id,
    //         documentSnapshot.data(),
    //       );
    //     });
    //   });
    firestore()
      .collection('mainSection')
      .doc(mainSection)
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
        navigation.navigate('Home');
      })
      .catch(error => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  useEffect(() => {
    setMainSection(sectionNumber);
  }, []);

  return (
    <ScrollView>
      <View>
        <CustomInput
          textName="Main Section"
          value={mainSection}
          // editable={false}
          onChangeText={text => setMainSection(text)}
        />
        <CustomInput
          textName="Section"
          value={section1}
          onChangeText={text => setSection(text)}
        />
        <CustomInput textName="Title" onChangeText={text => setTitle(text)} />
        <CustomInput
          typeOfInput="multiline"
          value={content1}
          numberOfLines={10}
          textName="Content"
          onChangeText={text => setContent(text)}
        />
        <CustomButton
          textName="Save"
          backgroundColor="#3E4684"
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateManualScreen;

const styles = StyleSheet.create({
  continer: {
    backgroundColor: '#F1F6FE',
    flex: 1,
    padding: 10,
  },
});
