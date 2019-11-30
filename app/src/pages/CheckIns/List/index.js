import React from 'react';

import { Container, AddButton, ListView, CheckIn, Title, Time } from './styles';

export default function List() {
  const data = [
    { index: 3, time: 'Hoje às 14h' },
    { index: 2, time: 'Ontem às 20h' },
    { index: 1, time: 'Há 5 dias' }
  ];
  return (
    <Container>
      <AddButton onPress={() => {}}>Novo check-in</AddButton>
      <ListView
        data={data}
        keyExtractor={item => String(item.index)}
        renderItem={({ item }) => (
          <CheckIn>
            <Title>Check-in #{item.index}</Title>
            <Time>{item.time}</Time>
          </CheckIn>
        )}
      />
    </Container>
  );
}
