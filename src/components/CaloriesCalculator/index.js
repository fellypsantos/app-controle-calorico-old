import React, {useState, useEffect, useContext} from 'react';
import {Container, ContainerKcalInfo, KcalLabel, KcalValue} from './styles';

import {ProfileContext} from '../../Contexts/ProfileContext';

const CaloriesCalculator = () => {
  const {theProfile, theFoodHistory, Translator} = useContext(ProfileContext);
  const [BEEValue, setBEEValue] = useState(0);
  const [kcalSum, setKcalSum] = useState(0);

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

  useEffect(() => {
    let tempKcalSum = 0;

    theFoodHistory.map(item => {
      tempKcalSum += parseInt(item.kcal, 10);
      setKcalSum(tempKcalSum);
      return item;
    });
  }, [theFoodHistory]);

  return (
    <Container>
      <ContainerKcalInfo>
        <KcalValue>1200</KcalValue>
        <KcalLabel>{Translator('Min')}</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo isMiddle>
        <KcalValue isMiddle>{kcalSum}</KcalValue>
        <KcalLabel>{Translator('Consumed')} (KCal)</KcalLabel>
      </ContainerKcalInfo>

      <ContainerKcalInfo>
        <KcalValue>{BEEValue}</KcalValue>
        <KcalLabel>{Translator('Max')}</KcalLabel>
      </ContainerKcalInfo>
    </Container>
  );
};

export default CaloriesCalculator;
