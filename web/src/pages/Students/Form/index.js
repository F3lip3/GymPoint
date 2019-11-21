import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as yup from 'yup';

import { FormWrapper, Header, Container, FieldBox } from '~/styles/customForm';

import api from '~/services/api';
import history from '~/services/history';

const schema = yup.object().shape({
  name: yup.string().required('Esse campo é obrigatório.'),
  email: yup
    .string()
    .email('Informe um e-mail válido.')
    .required('Esse campo é obrigatório.'),
  age: yup
    .number()
    .typeError('Esse campo é obrigatório.')
    .required('Esse campo é obrigatório.')
    .positive('Idade inválida.')
    .integer('Idade inválida.')
    .min(10, 'Idade inválida. São aceitos apenas alunos com 10 anos ou mais.'),
  weight: yup
    .number()
    .typeError('Esse campo é obrigatório.')
    .required('Esse campo é obrigatório.')
    .positive('Peso inválido.')
    .integer('Peso inválido. Informe o peso cheio, sem quebras.')
    .min(20, 'Peso inválido. O mínimo é 20 kg.'),
  height: yup
    .number()
    .typeError('Esse campo é obrigatório.')
    .required('Esse campo é obrigatório.')
    .positive('Altura inválida.')
    .integer('Altura inválida. Informe a altura em centímentos.')
});

export default function StudentForm({ match }) {
  const {
    params: { id }
  } = match;

  const [student, setStudent] = useState({});

  useEffect(() => {
    async function loadStudent(studentId) {
      try {
        const response = await api.get(`/students/${studentId}`);
        if (response && response.data) {
          setStudent(response.data);
        }
      } catch (err) {
        toast.error('Aluno não encontrado!');
        history.push('/students');
      }
    }
    if (id) loadStudent(id);
  }, []);

  async function handleSubmit(data) {
    try {
      const response = id
        ? await api.put(`/students/${id}`, data)
        : await api.post('/students', data);
      if (response.status === 200) {
        toast.success(
          id
            ? 'Dados do aluno alterados com sucesso.'
            : 'Novo aluno cadastrado com sucesso.'
        );
        history.push('/students');
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(`Falha ao ${id ? 'atualiza dados do' : 'criar novo'} aluno`);
      console.tron.error(err);
    }
  }

  return (
    <FormWrapper schema={schema} initialData={student} onSubmit={handleSubmit}>
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
    </FormWrapper>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};
