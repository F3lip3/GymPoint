import React, { useState, useEffect } from 'react';
import { Input } from '@rocketseat/unform';
import { MdClear } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import api from '~/services/api';
import { formatDate } from '~/util/format';

import List from '~/components/List';
import { PopupWrapper, Popup } from './styles';

const schema = yup.object().shape({
  answer: yup.string().required('Insira uma resposta')
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [helpOrder, setHelpOrder] = useState(null);

  const columns = [
    {
      key: 'studentName',
      title: 'ALUNO',
      align: 'left',
      width: 60
    },
    {
      key: 'createdAt',
      title: 'DATA',
      align: 'center',
      width: 20
    },
    {
      key: 'act',
      title: '',
      align: 'right',
      width: 20,
      actions: ['answer']
    }
  ];

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/help-orders?page=1');
      setHelpOrders(
        response.data.map(order => ({
          ...order,
          studentName: order.student.name,
          createdAt: formatDate(order.created_at, 'dd/MM/yyyy HH:mm')
        }))
      );
    }
    loadHelpOrders();
  }, []);

  function handleAnswer(id) {
    const order = helpOrders.find(x => x.id === id);
    if (order) {
      setHelpOrder(order);
    }
  }

  async function handleSubmit(data) {
    try {
      const { id } = helpOrder;
      const response = await api.post(`/help-orders/${id}/answer`, data);
      if (response.status === 200) {
        toast.success('Pedido de ajuda respondido com sucesso!');
        setHelpOrders(helpOrders.filter(x => x.id !== id));
        setHelpOrder(null);
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      toast.error('Falha ao response pedido de ajuda. Tente novamente...');
      console.tron.error(err);
    }
  }

  function closePopup() {
    setHelpOrder(null);
  }

  return (
    <>
      <List
        title="Pedidos de auxílio"
        columns={columns}
        data={helpOrders}
        onAnswer={handleAnswer}
        keyColumn="id"
      />
      {helpOrder && (
        <PopupWrapper>
          <Popup schema={schema} onSubmit={handleSubmit}>
            <button type="button" className="close" onClick={closePopup}>
              <MdClear size={20} color="#666" />
            </button>
            <strong>PERGUNTA DO ALUNO</strong>
            <div>{helpOrder.question}</div>
            <label htmlFor="answer">SUA RESPOSTA</label>
            <Input
              multiline
              type="text"
              id="answer"
              name="answer"
              placeholder="Insira aqui sua resposta ao cliente"
            />
            <button type="submit">
              <span>Responder aluno</span>
            </button>
          </Popup>
        </PopupWrapper>
      )}
    </>
  );
}
