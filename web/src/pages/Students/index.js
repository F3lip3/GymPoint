import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';

import 'react-confirm-alert/src/react-confirm-alert.css';

import api from '~/services/api';
import List from '~/components/List';

export default function Students() {
  const [students, setStudents] = useState([]);
  const columns = [
    {
      key: 'name',
      title: 'NOME',
      align: 'left',
      width: 35
    },
    {
      key: 'email',
      title: 'E-MAIL',
      align: 'left',
      width: 35
    },
    {
      key: 'age',
      title: 'IDADE',
      align: 'center',
      width: 10
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
      to: '/plans'
    }
  ];
  const search = {
    param: 'q',
    placeholder: 'Buscar aluno'
  };

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');
      setStudents(response.data);
    }
    loadStudents();
  }, []);

  function handleEdit(id) {
    console.tron.log('editing:', id);
  }

  function handleRemove(id) {
    const student = students.find(x => x.id === id);
    if (student) {
      confirmAlert({
        title: 'Confirme para remover',
        message: `Tem certeza que deseja remover o aluno ${student.name}?`,
        buttons: [
          {
            label: 'Sim',
            onClick: () => console.tron.log('remover', id)
          },
          {
            label: 'Não'
          }
        ]
      });
    }

    console.tron.log('editing:', id);
  }

  async function handleSearch(value) {
    const response = await api.get(`/students${value ? `?q=${value}` : ''}`);
    setStudents(response.data);
  }

  return (
    <List
      title="Gerenciando alunos"
      columns={columns}
      actions={actions}
      data={students}
      search={search}
      onEdit={handleEdit}
      onRemove={handleRemove}
      onSearch={handleSearch}
      keyColumn="id"
    />
  );
}
