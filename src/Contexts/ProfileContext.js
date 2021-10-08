import React, {createContext, useState, useEffect} from 'react';
import dayjs from 'dayjs';
import Database from '../DataBase';
import DeviceLocaleHandler from '../DeviceLocaleHandler';

// Multilanguage implementation
import {useTranslation} from 'react-i18next';

export const ProfileContext = createContext();

const ProfileProvider = ({children}) => {
  const {t: Translator} = useTranslation();

  const [theProfile, setProfile] = useState({
    name: '',
    phrase: '',
    weight: '',
    height: '',
    age: '',
    gender: 'M',
    activity_factor: 1.2,
  });

  const deviceLocale = DeviceLocaleHandler.getSupported();
  const dayjsHandler = dayjs().locale(deviceLocale);

  const [theFoodHistory, setFoodHistory] = useState([]);
  const [foodHistoryDate, setFoodHistoryDate] = useState(dayjsHandler);
  const [dateInHistoryTab, setDateInHistoryTab] = useState(dayjsHandler);
  const [isPremiumTime, setIsPremiumTime] = useState(false);
  const [intervalHandler, setIntervalHandler] = useState(null);
  const [getDeviceLocale] = useState(deviceLocale);

  const handleAdMobVisibility = () => {
    Database.getLastSeenRewardAd(result => {
      const lastTimeStamp = result.rows.item(0).ts_moment_last_seen_reward_ad;

      if (lastTimeStamp !== '0') {
        const minutes = dayjs().diff(lastTimeStamp, 'minutes');
        console.log('[MINUTES PREMIUM PASSED]: ', minutes);

        // 240 min -> 4h
        if (minutes < 240) {
          // console.log('PREMIUM IS ENABLED! NO ADS!');
          setIsPremiumTime(true);
        } else {
          // console.log('ADS WILL SHOWN NORMALLY!');
          setIsPremiumTime(false);
        }
      }
    });
  };

  useEffect(() => {
    console.log('LOADING CONTEXT FROM DATABASE...');

    // LOAD PROFILE
    Database.getProfileData(results => {
      if (results.rows.length === 1) {
        const databaseProfile = results.rows.item(0);
        setProfile({
          ...databaseProfile,
        });
      }
    });

    // LOAD FOOD HISTORY
    Database.getFoodHistory(dayjs().format('YYYY-MM-DD'), res => {
      if (res.rows.length > 0) {
        const dbFoodList = res.rows.raw();
        setFoodHistory(dbFoodList);
      }
    });

    handleAdMobVisibility();
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

  useEffect(() => {
    if (isPremiumTime && intervalHandler === null) {
      const theIntervalHandler = setInterval(() => {
        // Checking premium expiration time
        handleAdMobVisibility();
      }, 5000);
      setIntervalHandler(theIntervalHandler);
    } else if (!isPremiumTime && intervalHandler !== null) {
      clearInterval(intervalHandler);
      setIntervalHandler(null);
    }
  }, [isPremiumTime, intervalHandler]);

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
    getDeviceLocale,
    Translator,
  };

  return (
    <ProfileContext.Provider value={ContextValues}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;
