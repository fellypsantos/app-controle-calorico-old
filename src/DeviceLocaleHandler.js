import {NativeModules} from 'react-native';

export default {
  getSupported: () => {
    const currentDeviceLocale = NativeModules.I18nManager.localeIdentifier;
    // console.log('currentDeviceLocale', currentDeviceLocale);

    const sanitizantedLocale = currentDeviceLocale
      .replace('_', '-')
      .toLowerCase();

    const countryID = sanitizantedLocale.split('-')[0];

    switch (countryID) {
      case 'pt':
      case 'en':
      case 'es':
        return countryID;

      default:
        return 'en';
    }
  },
};
