import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AdButtonContainer, AdButtonBlock } from './styles';

import { ProfileContext } from '../../Contexts/ProfileContext';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AdIconsBar = () => {
  const navigation = useNavigation();
  const { isPremiumTime } = useContext(ProfileContext);

  return (
    <AdButtonContainer>
      {!isPremiumTime && (
        <>
          <AdButtonBlock>
            <TouchableOpacity
              onPress={() => navigation.navigate('AdMobRewardIntro')}>
              <Icon name="gift" color="#fff" size={25} />
            </TouchableOpacity>
          </AdButtonBlock>
        </>
      )}
    </AdButtonContainer>
  );
};

export default AdIconsBar;
