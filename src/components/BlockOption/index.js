import React, {useContext} from 'react';
import {
  Container,
  BlockTitle,
  RightContentBox,
  BlockDescription,
} from './styles';

import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';
import {ProfileContext} from '../../Contexts/ProfileContext';

const BlockOption = ({handleOnPress}) => {
  const {Translator} = useContext(ProfileContext);

  return (
    <Container onPress={handleOnPress}>
      <Icon name="google-play" size={20} color={Colors.Grey.Default} />
      <RightContentBox>
        <BlockTitle>
          {Translator('BlockOption.Developer.MoreApps.Title')}
        </BlockTitle>
        <BlockDescription>
          {Translator('BlockOption.Developer.MoreApps.Description')}
        </BlockDescription>
      </RightContentBox>
    </Container>
  );
};

export default BlockOption;
