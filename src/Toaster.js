import {ToastAndroid} from 'react-native';

export default {
  ShowToast: (text, duration = 'SHORT') => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      duration === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG,
      ToastAndroid.TOP,
      0,
      50,
    );
  },
};
