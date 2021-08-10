import React, {useContext} from 'react';
import {Container, Name, Phrase, ProfilePicture} from './styles';

import {ProfileContext} from '../../Contexts/ProfileContext';
const profilePictureMale = require('../../../assets/images/man.png');
const profilePictureFemale = require('../../../assets/images/girl.png');

const Profile = () => {
  const {theProfile} = useContext(ProfileContext);
  return (
    <Container>
      <ProfilePicture
        source={
          theProfile.gender === 'M' ? profilePictureMale : profilePictureFemale
        }
      />
      <Name>{theProfile.name}</Name>
      <Phrase>{theProfile.phrase}</Phrase>
    </Container>
  );
};

export default Profile;
