import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as MaterialDesign from 'react-icons/md';

import history from '~/services/history';
import { Wrapper, Header, Container, HeaderColumn, Column } from './styles';

export default function List({
  title,
  actions,
  columns,
  data,
  search,
  onEdit,
  onRemove,
  onAnswer,
  onSearch,
  keyColumn
}) {
  const [formattedActions, setFormattedActions] = useState([]);

  useEffect(() => {
    setFormattedActions(
      actions.map(act => ({
        ...act,
        mdIcon: MaterialDesign[act.icon]
      }))
    );
  }, [actions]);

  function handleAction(to) {
    history.push(to);
  }

  function handleItemAction(action, id) {
    switch (action) {
      case 'edit':
        onEdit(id);
        break;
      case 'remove':
        onRemove(id);
        break;
      case 'answer':
        onAnswer(id);
        break;
      default:
        throw new Error('Action undefined');
    }
  }

  function handleSearch(e) {
    onSearch(e.target.value);
  }

  return (
    <Wrapper>
      {title && (
        <Header>
          <h2>{title}</h2>
          <div className="headerActions">
            {formattedActions.map(action => (
              <button
                type="button"
                key={action.title}
                onClick={() => handleAction(action.to)}
              >
                <action.mdIcon />
                <span>{action.title}</span>
              </button>
            ))}
            {search && (
              <div className="search">
                <MaterialDesign.MdSearch color="#999" size={20} />
                <input
                  type="search"
                  placeholder={search.placeholder}
                  onChange={handleSearch}
                />
              </div>
            )}
          </div>
        </Header>
      )}
      <Container>
        {data && data.length > 0 ? (
          <table cellSpacing="0" cellPadding="0">
            <thead>
              <tr>
                {columns.map(column => (
                  <HeaderColumn
                    key={column.key}
                    align={column.align}
                    width={column.width}
                  >
                    {column.title}
                  </HeaderColumn>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={String(item[keyColumn])}>
                  {columns.map(column => (
                    <Column
                      key={`${column.key}_${item[keyColumn]}`}
                      align={column.align}
                      width={column.width}
                    >
                      {column.actions
                        ? column.actions.map(act => (
                            <button
                              key={`${column.key}_${item[keyColumn]}_${act}}`}
                              type="button"
                              className={act}
                              onClick={() => handleItemAction(act, item.id)}
                            >
                              {act === 'edit' && 'editar'}
                              {act === 'remove' && 'apagar'}
                              {act === 'answer' && 'responder'}
                            </button>
                          ))
                        : item[column.key]}
                    </Column>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>Nenhum aluno encontrado!</h2>
        )}
      </Container>
    </Wrapper>
  );
}

List.propTypes = {
  title: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired
    })
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      align: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
      actions: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  search: PropTypes.shape({
    param: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  }),
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  onAnswer: PropTypes.func,
  onSearch: PropTypes.func,
  keyColumn: PropTypes.string.isRequired
};

List.defaultProps = {
  title: '',
  actions: [],
  search: null,
  onEdit: null,
  onRemove: null,
  onAnswer: null,
  onSearch: null
};
