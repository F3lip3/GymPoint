import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import { Container, Input, AddButton } from './styles';

import api from '~/services/api';

export default function Create({ navigation }) {
  const { id } = useSelector(state => state.auth.user);
  const [question, setQuestion] = useState('');

  async function handleAddHelpOrder() {
    try {
      const response = await api.post(`students/${id}/help-orders`, {
        question
      });
      if (response.status === 200) {
        navigation.goBack();
      } else {
        Alert.alert(
          'Falha ao adicionar pedido de auxílio',
          response.data.error
        );
      }
    } catch (err) {
      console.tron.error(err);
      Alert.alert(
        'Erro',
        'Erro indefinido ao adicionar pedido de auxílio. Tente novamente...'
      );
    }
  }

  return (
    <Container>
      <Input
        placeholder="Inclua seu pedido de auxílio"
        placeholderTextColor="#999"
        onChangeText={text => setQuestion(text)}
        multiline
      />
      <AddButton onPress={handleAddHelpOrder}>Enviar pedido</AddButton>
    </Container>
  );
}

Create.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func
  }).isRequired
};
