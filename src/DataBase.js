import SQLite from 'react-native-sqlite-storage';
import {Alert} from 'react-native';

export default class DataBase {
  static db = null;

  static open = () => {
    if (this.db == null) {
      this.db = SQLite.openDatabase(
        {name: 'appDB', createFromLocation: '~database.sqlite'},
        () => {
          console.log('DATABASE SUCCESSFULLY OPENED!');
        },
        err => Alert.alert('PUTZ!', 'Erro ao abrir o banco de dados.\n', err),
      );
    }
    return this.db;
  };

  static validateConnection = () => {
    if (this.db === null) {
      console.error('DATABASE NOT OPENED');
    }
  };

  static getProfileData = callback => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM profile', null, (txi, results) => {
        callback(results);
      });
    });
  };

  static setProfileData = (theProfile, callback, isUpdating = false) => {
    this.validateConnection();

    const {
      id,
      name,
      phrase,
      weight,
      height,
      age,
      gender,
      activity_factor,
    } = theProfile;

    const sqlToRun = !isUpdating
      ? 'INSERT INTO profile(name, phrase, weight, height, age, gender, activity_factor) VALUES (?,?,?,?,?,?,?)'
      : 'UPDATE profile SET name=?, phrase=?, weight=?, height=?, age=?, gender=?, activity_factor=? WHERE id=?';

    console.log('sqlToRun', sqlToRun);

    const sqlValues = [
      name,
      phrase,
      weight,
      height,
      age,
      gender,
      activity_factor,
    ];

    if (isUpdating) sqlValues.push(id);

    this.db.transaction(tx => {
      tx.executeSql(sqlToRun, sqlValues, (txi, results) => {
        callback(results);
      });
    });
  };

  static getFoodHistory = (datetime_sql, callback) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM food_registry WHERE date(datetime_sql) = date(?) ORDER BY id DESC',
        [datetime_sql],
        (txi, results) => {
          callback(results);
        },
      );
    });
  };

  static addFoodRegistry = (foodData, callback) => {
    this.validateConnection();

    const {
      foodName,
      foodKcal,
      foodCategory,
      currentDateMoment,
      currentDateSql,
    } = foodData;

    const sqlValues = [
      foodName,
      foodCategory,
      foodKcal,
      currentDateMoment,
      currentDateSql,
    ];

    this.db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO food_registry(name, category_level, kcal, datetime_moment, datetime_sql) VALUES(?,?,?,?,?)',
        sqlValues,
        (rx, results) => {
          const customResults = {
            ...results,
            insertedRow: {
              id: results.insertId,
              name: foodName,
              category_level: foodCategory,
              kcal: foodKcal,
              datetime_moment: currentDateMoment,
              datetime_sql: currentDateSql,
            },
          };

          callback(customResults);
        },
      );
    });
  };

  static updateFoodRegistry = (foodData, callback) => {
    this.validateConnection();

    const {
      id,
      foodName,
      foodKcal,
      foodCategory,
      currentDateMoment,
      currentDateSql,
    } = foodData;

    const sqlData = [
      foodName,
      foodCategory,
      foodKcal,
      currentDateMoment,
      currentDateSql,
      id,
    ];

    this.db.transaction(tx => {
      tx.executeSql(
        'UPDATE food_registry SET name=?, category_level=?, kcal=?, datetime_moment=?, datetime_sql=? WHERE id=?',
        sqlData,
        (rx, results) => {
          callback(results);
        },
      );
    });
  };

  static deleteFoodRegistry = (foodData, callback) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM food_registry WHERE id=?',
        [foodData.id],
        (rx, results) => {
          callback(results);
        },
      );
    });
  };

  static getLastSeenRewardAd = callback => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql('SELECT * FROM admob', null, (txi, results) => {
        callback(results);
      });
    });
  };

  static setLastSeenRewardAd = (moment_timestamp, callback) => {
    this.validateConnection();

    this.db.transaction(tx => {
      tx.executeSql(
        'UPDATE admob SET ts_moment_last_seen_reward_ad=?',
        [moment_timestamp],
        (txi, results) => {
          callback(results);
        },
      );
    });
  };
}
