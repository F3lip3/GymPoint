import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import { MdCheckCircle } from 'react-icons/md';

import 'react-confirm-alert/src/react-confirm-alert.css';

import api from '~/services/api';
import history from '~/services/history';
import { formatDate } from '~/util/format';
import List from '~/components/List';

export default function Students() {
  const [registrations, setRegistrations] = useState([]);

  const columns = [
    {
      key: 'studentName',
      title: 'ALUNO',
      align: 'left',
      width: 20
    },
    {
      key: 'planTitle',
      title: 'PLANO',
      align: 'center',
      width: 15
    },
    {
      key: 'startDateFormatted',
      title: 'INÍCIO',
      align: 'center',
      width: 20
    },
    {
      key: 'endDateFormatted',
      title: 'TÉRMINO',
      align: 'center',
      width: 20
    },
    {
      key: 'icon',
      title: 'ATIVA',
      align: 'center',
      width: 10
    },
    {
      key: 'act',
      title: '',
      align: 'right',
      width: 15,
      actions: ['edit', 'remove']
    }
  ];

  const actions = [
    {
      title: 'Cadastrar',
      icon: 'MdAdd',
      to: '/registrations/add'
    }
  ];

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get('/registrations');
      if (response && response.data) {
        setRegistrations(
          response.data.map(registration => ({
            ...registration,
            studentName: registration.student.name,
            planTitle: registration.plan.title,
            startDateFormatted: formatDate(registration.start_date),
            endDateFormatted: formatDate(registration.end_date),
            icon: registration.active ? MdCheckCircle : null
          }))
        );
      }
    }
    loadRegistrations();
  }, []);

  async function remove(id) {
    try {
      await api.delete(`/registrations/${id}`);
      setRegistrations(registrations.filter(x => x.id !== id));
      toast.success('Matrícula removida com sucesso!');
    } catch (err) {
      console.tron.error(err);
      toast.error('Falha ao remover matrícula!');
    }
  }

  function handleEdit(id) {
    history.push(`/registration/${id}`);
  }

  function handleRemove(id) {
    const registration = registrations.find(x => x.id === id);
    if (registration) {
      confirmAlert({
        title: 'Confirme para remover',
        message: `Tem certeza que deseja remover a matrícula do aluno ${registration.student.name}?`,
        buttons: [
          {
            label: 'Sim',
            onClick: () => remove(id)
          },
          {
            label: 'Não'
          }
        ]
      });
    }
  }

  return (
    <List
      title="Gerenciando matrículas"
      columns={columns}
      actions={actions}
      data={registrations}
      onEdit={handleEdit}
      onRemove={handleRemove}
      keyColumn="id"
      larger
    />
  );
}
