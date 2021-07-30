import React from 'react';
import {TouchableOpacity} from 'react-native';
import {AdButtonContainer} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome5';

const AdIconsBar = () => (
  <AdButtonContainer>
    <TouchableOpacity>
      <Icon name="ad" color="#fff" size={25} />
    </TouchableOpacity>

    <TouchableOpacity>
      <Icon name="gift" color="#fff" size={25} />
    </TouchableOpacity>
  </AdButtonContainer>
);

export default AdIconsBar;
