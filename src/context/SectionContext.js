import React, {useContext, useState, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {set} from 'react-native-reanimated';

export const SectionContext = createContext();

export function SectionProvider({children}) {
  const [mainSectionId, setMainSectionId] = useState(null);

  return (
    <SectionContext.Provider
      value={{
        mainSectionId,
        setMainSectionId,
        mainSectionId1: async mainSectionId1 => {
          setMainSectionId(mainSectionId1);
          console.log('CONTEXT: ', mainSectionId);
        },
      }}>
      {children}
    </SectionContext.Provider>
  );
}
