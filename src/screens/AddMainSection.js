import {StyleSheet, Text, View, ScrollView, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import firestore from '@react-native-firebase/firestore';
import {get} from 'react-native/Libraries/Utilities/PixelRatio';

const AddMainSection = ({navigation}) => {
  const [sectionTitle, setSectionTitle] = useState();
  const [sectionNumber, setsectionNumer] = useState();

  const haldleSave = async () => {
    firestore()
      .collection('mainSection')
      .doc(sectionNumber)
      .set({
        sectionNumber: sectionNumber,
        sectionTitle: sectionTitle,
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

  const handleDelete = async () => {
    await firestore()
      .collection('mainSection')
      .doc(sectionNumber)

      .delete()
      .then(() => {
        Alert.alert(
          'Main Section deleted!',
          'Your main section has been deleted Successfully!',
        );

        navigation.navigate('Home');
      });
  };
  return (
    <ScrollView>
      <View>
        <CustomInput
          textName="Main Section"
          value={sectionNumber}
          onChangeText={text => setsectionNumer(text)}
        />
        <CustomInput
          textName="Title"
          value={sectionTitle}
          onChangeText={text => setSectionTitle(text)}
        />

        <CustomButton
          textName="Save"
          backgroundColor="#3E4684"
          onPress={haldleSave}
        />
        <CustomButton
          textName="Delete Section"
          backgroundColor="#B20600"
          onPress={handleDelete}
        />
      </View>
    </ScrollView>
  );
};

export default AddMainSection;

const styles = StyleSheet.create({});
