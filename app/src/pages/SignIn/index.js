import React from 'react';
import { Image } from 'react-native';

import logo from '~/assets/logo.png';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  function handleSubmit() {
    console.tron.log('submit');
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          icon="fingerprint"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}
