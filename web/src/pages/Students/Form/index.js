import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Wrapper, Header, Container, FieldBox } from '~/styles/customForm';

import history from '~/services/history';

export default function StudentForm({ match }) {
  const {
    params: { id }
  } = match;

  return (
    <Wrapper>
      <Header>
        <h2>{id ? 'Edição de aluno' : 'Cadastro de aluno'}</h2>
        <div>
          <button
            type="button"
            className="back"
            onClick={() => history.goBack()}
          >
            <MdKeyboardArrowLeft color="#fff" size={20} />
            <span>VOLTAR</span>
          </button>
          <button type="submit" className="save">
            <MdCheck color="#fff" size={20} />
            <span>SALVAR</span>
          </button>
        </div>
      </Header>
      <Container>
        <FieldBox direction="column">
          <label htmlFor="name">NOME COMPLETO</label>
          <Input type="text" id="name" name="name" placeholder="John Doe" />
        </FieldBox>
        <FieldBox direction="column">
          <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
          />
        </FieldBox>
        <FieldBox direction="row">
          <div>
            <label htmlFor="age">IDADE</label>
            <Input type="number" id="age" name="age" placeholder="33" />
          </div>
          <div>
            <label htmlFor="weight">PESO (em kg)</label>
            <Input type="number" id="weight" name="weight" placeholder="75" />
          </div>
          <div>
            <label htmlFor="height">ALTURA (cm)</label>
            <Input type="number" id="height" name="height" placeholder="165" />
          </div>
        </FieldBox>
      </Container>
    </Wrapper>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number
    })
  }).isRequired
};
