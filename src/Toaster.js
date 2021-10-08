import {ToastAndroid} from 'react-native';

export default {
  ShowToast: (text, duration = 'SHORT') => {
    ToastAndroid.showWithGravityAndOffset(
      text,
      duration === 'SHORT' ? ToastAndroid.SHORT : ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      0,
      160,
    );
  },
};
