import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';

import 'react-confirm-alert/src/react-confirm-alert.css';

import api from '~/services/api';
import history from '~/services/history';
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
      to: '/students/add'
    }
  ];
  const search = {
    param: 'q',
    placeholder: 'Filtrar alunos por nome ou e-mail'
  };

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students');
      setStudents(response.data);
    }
    loadStudents();
  }, []);

  async function remove(id) {
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter(x => x.id !== id));
      toast.success('Aluno removido com sucesso!');
    } catch (err) {
      console.tron.error(err);
      toast.error('Falha ao remover aluno!');
    }
  }

  function handleEdit(id) {
    history.push(`/student/${id}`);
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
            onClick: () => remove(id)
          },
          {
            label: 'Não'
          }
        ]
      });
    }
  }

  async function handleSearch(value) {
    const response = await api.get(`/students${value ? `?q=${value}` : ''}`);
    setStudents(response.data);
  }

  return (
    <List
      title="Gerenciando alunos"
      emptyError="Nenhum aluno encontrado!"
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
