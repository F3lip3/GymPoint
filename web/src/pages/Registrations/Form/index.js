import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdCheck, MdSync } from 'react-icons/md';
import { startOfDay, addMonths, parseISO } from 'date-fns';
import * as yup from 'yup';

import 'react-datepicker/dist/react-datepicker.css';

import {
  ErrorWrapper,
  FormWrapper,
  Header,
  Container,
  FieldBox
} from '~/styles/form';

import { LoadingWrapper } from '~/styles/loading';

import api from '~/services/api';
import history from '~/services/history';
import DatePicker from '~/components/DatePicker';
import { formatPrice, formatDate } from '~/util/format';

const schema = yup.object().shape({
  student_id: yup
    .number()
    .typeError('Esse campo é obrigatório!')
    .required('Esse campo é obrigatório!'),
  plan_id: yup
    .number()
    .typeError('Esse campo é obrigatório!')
    .required('Esse campo é obrigatório!'),
  start_date: yup
    .date()
    .typeError('Esse campo é obrigatório!')
    .min(
      startOfDay(new Date()),
      'A matrícula só pode ser iniciada a partir de hoje!'
    )
    .required('Esse campo é obrigatório!')
});

export default function RegistrationForm({ match }) {
  const {
    params: { id }
  } = match;

  const [loading, setLoading] = useState(true);
  const [registration, setRegistration] = useState({});
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState({});
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState('');
  const [total, setTotal] = useState('R$ 0,00');

  useEffect(() => {
    if (plan && plan.duration && startDate) {
      setEndDate(
        formatDate(addMonths(new Date(startDate), plan.duration), 'dd/MM/yyyy')
      );
      setTotal(formatPrice(plan.duration * plan.price));
    } else {
      setEndDate('');
      setTotal('R$ 0,00');
    }
  }, [plan, startDate]);

  useEffect(() => {
    async function loadRegistration(registrationId) {
      try {
        const response = await api.get(`/registrations/${registrationId}`);
        if (response && response.data) {
          const formattedData = {
            student_id: response.data.student.id,
            plan_id: response.data.plan.id,
            start_date: parseISO(response.data.start_date)
          };
          setRegistration(formattedData);
          setPlan(plans.find(x => x.id === formattedData.plan_id));
          setStartDate(formattedData.start_date);
          setLoading(false);
        }
      } catch (err) {
        toast.error('Matrícula não encontrada!');
        history.push('/registrations');
      }
    }
    if (id && plans.length > 0 && students.length > 0) {
      loadRegistration(id);
    }
  }, [id, plans, students]);

  useEffect(() => {
    async function loadData() {
      try {
        const [studentsResponse, plansResponse] = await Promise.all([
          api.get('/students'),
          api.get('/plans')
        ]);
        setStudents(
          studentsResponse.data.map(student => ({
            ...student,
            title: student.name
          }))
        );
        setPlans(plansResponse.data);
        if (!id) setLoading(false);
      } catch (err) {
        toast.error('Falha ao carregar dados!');
        history.push('/registrations');
      }
    }
    loadData();
  }, [id]);

  async function handleSubmit(data) {
    try {
      const response = id
        ? await api.put(`/registrations/${id}`, data)
        : await api.post('/registrations', data);
      if (response.status === 200) {
        toast.success(
          id
            ? 'Matrícula alterada com sucesso.'
            : 'Novo matrícula cadastrada com sucesso.'
        );
        history.push('/registrations');
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error(`Falha ao ${id ? 'atualizar' : 'criar nova'} matrícula`);
      console.tron.error(err);
    }
  }

  function handlePlanChange(e) {
    const selectedPlan = plans.find(x => x.id === +e.target.value);
    if (selectedPlan) {
      setPlan(selectedPlan);
    }
  }

  function handleStartDateChange(date) {
    setStartDate(date);
  }

  return (
    <>
      {loading && (
        <LoadingWrapper width={900}>
          <MdSync size={50} color="#444" />
        </LoadingWrapper>
      )}
      {!loading && students.length === 0 && (
        <ErrorWrapper>Nenhum aluno encontrado!</ErrorWrapper>
      )}
      {!loading && plans.length === 0 && (
        <ErrorWrapper>Nenhum plano encontrado!</ErrorWrapper>
      )}
      {!loading && students.length > 0 && plans.length > 0 && (
        <FormWrapper
          schema={schema}
          initialData={registration}
          onSubmit={handleSubmit}
        >
          <Header>
            <h2>{id ? 'Edição de matrícula' : 'Cadastro de matrícula'}</h2>
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
              <label htmlFor="student_id">ALUNO</label>
              <Select id="student_id" name="student_id" options={students} />
            </FieldBox>
            <FieldBox direction="row">
              <div>
                <label htmlFor="plan_id">PLANO</label>
                <Select
                  id="plan_id"
                  name="plan_id"
                  options={plans}
                  onChange={handlePlanChange}
                />
              </div>
              <div>
                <label htmlFor="start_date">DATA DE INÍCIO</label>
                <DatePicker
                  id="start_date"
                  name="start_date"
                  onChange={handleStartDateChange}
                />
              </div>
              <div>
                <div className="fakeLabel">DATA DE TÉRMINO</div>
                <div className="fakeInput">{endDate}</div>
              </div>
              <div>
                <div className="fakeLabel">VALOR FINAL</div>
                <div className="fakeInput">{total}</div>
              </div>
            </FieldBox>
          </Container>
        </FormWrapper>
      )}
    </>
  );
}

RegistrationForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};
