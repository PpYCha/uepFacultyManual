import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import data from '../model/data';
import {useIsFocused} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../context/AuthContext';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    section: '1.0',
    title: 'GOVERNANCE AND ADMINISTRATION',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    section: '2.0',
    title: 'THE ACADEMIC STAFF',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    section: '3.0',
    title: 'ACADEMIC FREEDOM OF FACULTY MEMBERS',
  },
  {
    id: 'bd7a1cbea-c1b1-46c2-aed5-3ad53abb28ba',
    section: '4.0',
    title: 'FACULTY DEVELOPMENT',
  },
  {
    id: '3a1c68afc-c605-48d3-a4f8-fbd91aa97f63',
    section: '5.0',
    title: 'FACULTY DEVELOPMENT',
  },
  {
    id: '586924a0f-3da1-471f-bd96-145571e29d72',
    section: '6.0',
    title: 'FACULTY PRIVILEGES AND BENEFITS',
  },
];

const HomeScreen = ({navigation}) => {
  const [sectionList, setSectionList] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const {logout} = useContext(AuthContext);

  const isFocused = useIsFocused();

  const getData = async () => {
    try {
      const list = [];
      await firestore()
        .collection('mainSection')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {sectionNumber, sectionTitle} = doc.data();
            list.push({
              sectionNumber,
              sectionTitle,
            });
          });
        });

      setSectionList(list);
      // console.log('data:', list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  const renderItem = ({item}) => {
    // console.log('flatlist:', item);
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          navigation.navigate('SectionListScreen', {
            sectionNumber: item.sectionNumber,
          })
        }>
        <Text style={styles.title}>
          {item.sectionNumber} {item.sectionTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sectionList}
        renderItem={renderItem}
        keyExtractor={item => item.sectionNumber}
        extraData={selectedId}
      />
      {/* <CustomButton textName="Logout" onPress={() => logout()} /> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F1F6FE',

    padding: 5,
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    color: 'black',
  },
  item: {
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    color: 'black',
  },
  title: {
    fontSize: 15,
    textAlign: 'center',
    color: 'black',
  },
});
