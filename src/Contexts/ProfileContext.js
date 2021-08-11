import React, {createContext, useState, useEffect} from 'react';
import {NativeModules} from 'react-native';
import Database from '../DataBase';
import moment from 'moment/min/moment-with-locales';

export const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const [theProfile, setProfile] = useState({
    name: '',
    phrase: '',
    weight: '',
    height: '',
    age: '',
    gender: 'M',
    activity_factor: 1.2,
  });

  const deviceLocale = NativeModules.I18nManager.localeIdentifier;
  const momentjs = moment();
  momentjs.locale(deviceLocale);

  const [theFoodHistory, setFoodHistory] = useState([]);
  const [foodHistoryDate, setFoodHistoryDate] = useState(momentjs);
  const [dateInHistoryTab, setDateInHistoryTab] = useState(momentjs);

  useEffect(() => {
    console.log('LOADING CONTEXT FROM DATABASE...');
    Database.getProfileData(results => {
      if (results.rows.length === 1) {
        const databaseProfile = results.rows.item(0);
        console.log('databaseProfile', databaseProfile);

        setProfile({
          ...databaseProfile,
        });

        console.log('LOADED PROFILE FROM DATABASE.');
      } else {
        console.log('NO PROFILE FOUND!');
      }
    });

    Database.getFoodHistory(moment().format('YYYY-MM-DD'), res => {
      if (res.rows.length > 0) {
        const dbFoodList = res.rows.raw();
        setFoodHistory(dbFoodList);
      }
    });
  }, []);

  useEffect(() => {
    // PROFILE ALREADY EXISTS, CALL UPDATE
    if (theProfile.id > 0 && theProfile.needUpdate) {
      console.log('UPDATE PROFILE', theProfile);
      Database.setProfileData(
        theProfile,
        results => {
          console.log('UPDATE RESULTS: ', results);
          if (results.rowsAffected) {
            console.log('UPDATED SUCCESSFULLY, GO BACK TO HOME');
          }
        },
        true,
      );
    }

    // NO PROFILE YET, CALL INSERT
    else {
      if (theProfile.id === undefined && theProfile.name !== '') {
        console.log('INSERT NEW PROFILE', theProfile);

        Database.setProfileData(theProfile, results => {
          console.log('INSERT RESULTS: ', results);
          setProfile({
            ...theProfile,
            id: results.insertId,
          });
        });
      }
    }
  }, [theProfile]);

  // Context Values
  const ContextValues = {
    theProfile,
    setProfile,
    theFoodHistory,
    setFoodHistory,
    foodHistoryDate,
    setFoodHistoryDate,
    dateInHistoryTab,
    setDateInHistoryTab,
  };

  return (
    <ProfileContext.Provider value={ContextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;