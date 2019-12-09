import React from 'react';
import PropTypes from 'prop-types';

import { Container, Box, Header, Title, Time, Content } from './styles';

export default function Show({ navigation }) {
  const { question, answer, time } = navigation.state.params;

  return (
    <Container>
      <Box>
        <Header>
          <Title>PERGUNTA</Title>
          <Time>{time}</Time>
        </Header>
        <Content>{question}</Content>
        <Header style={{ marginTop: 20 }}>
          <Title>RESPOSTA</Title>
        </Header>
        <Content>{answer}</Content>
      </Box>
    </Container>
  );
}

Show.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        question: PropTypes.string,
        answer: PropTypes.string,
        time: PropTypes.string
      })
    })
  }).isRequired
};
