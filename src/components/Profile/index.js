import React from 'react';
import {Container, Name, Phrase, ProfilePicture} from './styles';

const profilePicture = require('../../../assets/images/man.png');

const Profile = () => (
  <Container>
    <ProfilePicture source={profilePicture} />
    <Name>Jhon Doe</Name>
    <Phrase>Just a guy in love with codes.</Phrase>
  </Container>
);

export default Profile;
