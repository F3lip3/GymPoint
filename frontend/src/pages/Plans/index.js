import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import List from '~/components/List';
import { formatPrice } from '~/util/format';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  const columns = [
    {
      key: 'title',
      title: 'TÍTULO',
      align: 'left',
      width: 40
    },
    {
      key: 'durationLabeled',
      title: 'DURAÇÃO',
      align: 'center',
      width: 20
    },
    {
      key: 'priceFormatted',
      title: 'VALOR/mês',
      align: 'center',
      width: 20
    },
    {
      key: 'act',
      title: '',
      align: 'right',
      width: 20,
      actions: ['edit', 'remove']
    }
  ];

  const actions = [
    {
      title: 'Cadastrar',
      icon: 'MdAdd',
      to: '/plans/add'
    }
  ];

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('/plans');
      if (response && response.data && response.data.length > 0) {
        setPlans(
          response.data.map(plan => ({
            ...plan,
            durationLabeled: `${plan.duration} ${
              plan.duration === 1 ? 'mês' : 'meses'
            }`,
            priceFormatted: formatPrice(plan.price)
          }))
        );
      }
    }
    loadPlans();
  }, []);

  async function remove(id) {
    try {
      await api.delete(`/plans/${id}`);
      setPlans(plans.filter(x => x.id !== id));
      toast.success('Plano removido com sucesso!');
    } catch (err) {
      console.tron.error(err);
      toast.error('Falha ao remover plano!');
    }
  }

  function handleEdit(id) {
    history.push(`/plan/${id}`);
  }

  function handleRemove(id) {
    const plan = plans.find(x => x.id === id);
    if (plan) {
      confirmAlert({
        title: 'Confirme para remover',
        message: `Tem certeza que deseja remover o plano ${plan.title}?`,
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
      title="Gerenciando planos"
      emptyError="Nenhum plano encontrado!"
      columns={columns}
      actions={actions}
      data={plans}
      onEdit={handleEdit}
      onRemove={handleRemove}
      keyColumn="id"
    />
  );
}
