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
  const [isPremiumTime, setIsPremiumTime] = useState(false);

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

    const handleAdMobVisibility = () => {
      Database.getLastSeenRewardAd(result => {
        const lastTimeStamp = result.rows.item(0).ts_moment_last_seen_reward_ad;
        console.log('[DATABASE] getLastSeenRewardAd', lastTimeStamp);

        if (lastTimeStamp !== '0') {
          const duration = moment.duration(moment().diff(lastTimeStamp));
          const minutes = Math.floor(duration.asMinutes());
          console.log('[MINUTES PREMIUM PASSED]: ', minutes);

          if (minutes < 1) {
            console.log('PREMIUM IS ENABLED! NO ADS!');
            setIsPremiumTime(true);
          } else {
            console.log('ADS WILL SHOWN NORMALLY!');
            setIsPremiumTime(false);
          }
        }
      });
    };

    handleAdMobVisibility();

    setInterval(() => {
      console.log('Checking premium expiration time...');
      handleAdMobVisibility();
    }, 5000);
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
    isPremiumTime,
    setIsPremiumTime,
  };

  return (
    <ProfileContext.Provider value={ContextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
