import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as MaterialDesign from 'react-icons/md';

import history from '~/services/history';
import { Wrapper, Header, Container, HeaderColumn, Column } from './styles';

export default function List({ title, actions, columns, data, keyColumn }) {
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

  return (
    <Wrapper>
      {title && (
        <Header>
          <h2>{title}</h2>
          {formattedActions && (
            <div>
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
            </div>
          )}
        </Header>
      )}
      <Container>
        <table>
          <thead>
            <tr>
              {columns.map(column => (
                <HeaderColumn key={column.key} align={column.align}>
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
                  >
                    {item[column.key]}
                  </Column>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
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
      align: PropTypes.string.isRequired
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  keyColumn: PropTypes.string.isRequired
};

List.defaultProps = {
  title: '',
  actions: []
};
