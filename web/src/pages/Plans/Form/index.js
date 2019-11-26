import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';
import * as yup from 'yup';

import { FormWrapper, Header, Container, FieldBox } from '~/styles/form';

import api from '~/services/api';
import history from '~/services/history';
import { formatPrice } from '~/util/format';

const schema = yup.object().shape({
  title: yup.string().required('Esse campo é obrigatório.'),
  duration: yup
    .number()
    .typeError('Esse campo é obrigatório.')
    .required('Esse campo é obrigatório.')
    .positive('Duração inválida.')
    .integer('Duração inválida.')
    .min(1, 'Duração inválida. Mínimo um mês.'),
  price: yup
    .number()
    .typeError('Esse campo é obrigatório.')
    .required('Esse campo é obrigatório.')
    .positive('Preço inválido.')
    .min(1, 'Preço inválido. O mínimo é 1R$.')
});

export default function StudentForm({ match }) {
  const {
    params: { id }
  } = match;

  const [plan, setPlan] = useState({});
  const [total, setTotal] = useState('R$ 0');

  useEffect(() => {
    async function loadPlan(planId) {
      try {
        const response = await api.get(`/plans/${planId}`);
        if (response && response.data) {
          setPlan(response.data);
        }
      } catch (err) {
        toast.error('Plano não encontrado!');
        history.push('/plans');
      }
    }
    if (id) loadPlan(id);
  }, [id]);

  useEffect(() => {
    setTotal(formatPrice((plan.duration || 0) * (plan.price || 0)));
  }, [plan]);

  function handleDurationChange(e) {
    const draft = { ...plan };
    draft.duration = e.target.value;
    setPlan(draft);
  }

  function handlePriceChange(e) {
    const draft = { ...plan };
    draft.price = e.target.value;
    setPlan(draft);
  }

  async function handleSubmit(data) {
    try {
      const response = id
        ? await api.put(`/plans/${id}`, data)
        : await api.post('/plans', data);
      if (response.status === 200) {
        toast.success(
          id
            ? 'Dados do plano alterados com sucesso.'
            : 'Novo plano cadastrado com sucesso.'
        );
        history.push('/plans');
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(`Falha ao ${id ? 'atualiza dados do' : 'criar novo'} plano`);
      console.tron.error(err);
    }
  }

  return (
    <FormWrapper schema={schema} initialData={plan} onSubmit={handleSubmit}>
      <Header>
        <h2>{id ? 'Edição de plano' : 'Cadastro de plano'}</h2>
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
          <label htmlFor="title">TÍTULO DO PLANO</label>
          <Input
            type="text"
            id="title"
            name="title"
            placeholder="Plano Básico"
          />
        </FieldBox>
        <FieldBox direction="row">
          <div>
            <label htmlFor="duration">DURAÇÃO (em meses)</label>
            <Input
              type="number"
              id="duration"
              name="duration"
              onChange={handleDurationChange}
            />
          </div>
          <div>
            <label htmlFor="price">PREÇO MENSAL</label>
            <Input
              type="text"
              id="price"
              name="price"
              onChange={handlePriceChange}
            />
          </div>
          <div>
            <div className="fakeLabel">PREÇO TOTAL</div>
            <div className="fakeInput">{total}</div>
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
