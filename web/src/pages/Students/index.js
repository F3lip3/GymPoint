import React, { useState, useEffect } from 'react';

import api from '~/services/api';
import List from '~/components/List';

export default function Students() {
  const [students, setStudents] = useState([]);
  const columns = [
    {
      key: 'name',
      title: 'NOME',
      align: 'left'
    },
    {
      key: 'email',
      title: 'E-MAIL',
      align: 'left'
    },
    {
      key: 'age',
      title: 'IDADE',
      align: 'center'
    }
  ];
  const actions = [
    {
      title: 'Cadastrar',
      icon: 'MdAdd',
      to: '/plans'
    }
  ];

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');
      setStudents(response.data);
    }
    loadStudents();
  }, []);

  return (
    <List
      title="Gerenciando alunos"
      columns={columns}
      actions={actions}
      data={students}
      keyColumn="id"
    />
  );
}
