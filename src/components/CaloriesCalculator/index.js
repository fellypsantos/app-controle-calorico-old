import React, {useState, useEffect, useContext} from 'react';
import {Container, ContainerKcalInfo, KcalLabel, KcalValue} from './styles';

import {ProfileContext} from '../../Contexts/ProfileContext';

const CaloriesCalculator = () => {
  const {theProfile} = useContext(ProfileContext);
  const [BEEValue, setBEEValue] = useState(0);

  useEffect(() => {
    // BEE Calculator
    const {weight, height, age, gender, activity_factor} = theProfile;

    const calc =
      gender === 'M'
        ? 13.75 * weight + 5 * height - 6.76 * age + 66.5
        : 9.56 * weight + 1.85 * height - 4.68 * age + 665;

    const parsedResult = parseInt(calc * parseFloat(activity_factor), 10);

    setBEEValue(parsedResult);
  }, [theProfile]);

  return (
    <Container>
      <ContainerKcalInfo>
        <KcalValue>1200</KcalValue>
        <KcalLabel>Mínimo</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo isMiddle>
        <KcalValue isMiddle>905</KcalValue>
        <KcalLabel>Consumido (KCal)</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo>
        <KcalValue>{BEEValue}</KcalValue>
        <KcalLabel>Máximo</KcalLabel>
      </ContainerKcalInfo>
    </Container>
  );
};

export default CaloriesCalculator;
