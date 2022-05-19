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
import {SectionContext} from '../context/SectionContext';
import CustomButton from '../components/CustomButton';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    section: '1.0',
    title: 'GOVERNANCE AND ADMINISTRATION',
    content:
      'Governance and administration are two basic ingredients of a good organization, be it public or private Governance sets the lines of authority and the control of power within the organization in order to achieve its vision, mission and objectives: On the other hand, administration describes the management and supervision of the different offices of the organization to promote and sustain the work efficiency and effectiveness of the employees, in particular, and the whole system, in general',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    section: '1.1',
    title: 'VISION',
    content: 'A world class university!',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    section: '1.2',
    title: 'MISSION',
    content:
      'To develop the learners into well-rounded persons imbued with an enlightened sense of nationalism, and a strong commitment to service, globally relevant, honest, hardworking, competent, efficient, and effective accelerators of progress.',
  },
  {
    id: 'bd7a1cbea-c1b1-46c2-aed5-3ad53abb28ba',
    section: '1.3.1',
    title: 'Powers of the University',
    content:
      'The powers of the University, in addition to those provided in the Constitution of the Republic of the Philippines, shall be those set forth in its Charter, those granted to corporations in general under the Corporation Law, and such other powers as may be further provided by law.',
  },
  {
    id: '3a1c68afc-c605-48d3-a4f8-fbd91aa97f63',
    section: '1.3.2',
    title: 'Government of the University',
    content:
      'The government of the University of Eastern Philippines shall be vested in its Governing Board (GB) known as the "Board of Regents (BOR)" of the University of Eastern Philippines. It shall exercise such specific powers and duties as provided for under Section 4 of Republic Act No. 8292 in addition to its general powers of administration and exercise of all the powers granted to a Board of Directors of a corporation under Section 36 of Batas Pambansa Bilang 68, otherwise known as the "Corporation Code of the Philippines." ',
  },
];

const SectionListScreen = ({route, navigation}) => {
  const [sectionList, setSectionList] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const isFocused = useIsFocused();

  const {sectionNumber} = route.params;

  // console.log('numberrrrrrrrrrrrrr ine', sectionNumber);

  const getData = async () => {
    try {
      const list = [];
      await firestore()
        .collection('mainSection')
        .doc(sectionNumber)
        .collection('subSection')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const subsectionId = doc.id;
            const {content, title} = doc.data();
            list.push({
              subsectionId,
              content,
              title,
            });
          });
        });

      setSectionList(list);
      console.log(sectionList);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          navigation.navigate('AddManualScreen', {
            sectionNumber: sectionNumber,
            subsectionId: item.subsectionId,
            title: item.title,
            content: item.content,
          });
        }}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sectionList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />

      {/* <CustomButton
        textName="Update Section"
        onPress={() =>
          navigation.navigate('UpdateManualScreen', {
            sectionNumber: sectionNumber,
          })
        }
      /> */}
    </SafeAreaView>
  );
};

export default SectionListScreen;

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
