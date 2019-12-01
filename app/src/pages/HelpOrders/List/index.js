import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Container,
  AddButton,
  ListView,
  HelpOrder,
  Header,
  Content,
  StatusBox,
  StatusIcon,
  Status,
  Time,
  Question
} from './styles';

import api from '~/services/api';
import { formatTime } from '~/utils/format';

const PAGE_SIZE = 10;

function List({ navigation, isFocused }) {
  const { id } = useSelector(state => state.auth.user);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function fetchHelpOrders(fetchPage = 1) {
    setLoading(true);
    const response = await api.get(
      `/students/${id}/help-orders?page=${fetchPage}`
    );
    const helpOrders = response.data;
    if (helpOrders && helpOrders.length > 0) {
      const currentData = fetchPage === 1 ? [] : data;
      const fetchedData = [
        ...currentData,
        ...helpOrders.map(helpOrder => ({
          ...helpOrder,
          time: formatTime(helpOrder.created_at)
        }))
      ];
      setData(fetchedData);
      setPage(fetchPage);
      setLoading(false);
    }
  }

  function handleNewHelpOrder() {
    navigation.navigate('Create');
  }

  async function handleEndReached() {
    if (data.length / page === PAGE_SIZE) {
      await fetchHelpOrders(page + 1);
    }
  }

  async function handleRefresh() {
    await fetchHelpOrders();
  }

  function handleShowAnswer(item) {
    if (item.answer) {
      navigation.navigate('Show', item);
    }
  }

  useEffect(() => {
    fetchHelpOrders();
  }, [isFocused]);

  return (
    <Container>
      <AddButton onPress={handleNewHelpOrder}>Novo pedido de auxílio</AddButton>
      <ListView
        data={data}
        keyExtractor={item => String(item.id)}
        refreshing={loading}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <HelpOrder
            onPress={() => handleShowAnswer(item)}
            activeOpacity={item.answer ? 0.2 : 1}
          >
            <Header>
              <StatusBox>
                <StatusIcon
                  name="check-circle"
                  size={16}
                  answered={!!item.answer}
                />
                <Status answered={!!item.answer}>
                  {item.answer ? 'Respondido' : 'Sem resposta'}
                </Status>
              </StatusBox>
              <Time>{item.time}</Time>
            </Header>
            <Content>
              <Question numberOfLines={4} ellipsizeMode="tail">
                {item.question}
              </Question>
            </Content>
          </HelpOrder>
        )}
      />
    </Container>
  );
}

List.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    addListener: PropTypes.func
  }).isRequired,
  isFocused: PropTypes.bool.isRequired
};

export default withNavigationFocus(List);
