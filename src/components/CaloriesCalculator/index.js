import React from 'react';
import {Container, ContainerKcalInfo, KcalLabel, KcalValue} from './styles';

const CaloriesCalculator = () => (
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
      <KcalValue>2065</KcalValue>
      <KcalLabel>Máximo</KcalLabel>
    </ContainerKcalInfo>
  </Container>
);

export default CaloriesCalculator;
