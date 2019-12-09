import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Container, AddButton, ListView, CheckIn, Title, Time } from './styles';
import { signOut } from '~/store/modules/auth/actions';

import api from '~/services/api';
import { formatTime } from '~/utils/format';

const PAGE_SIZE = 30;

export default function List() {
  const dispatch = useDispatch();
  const { id } = useSelector(state => state.auth.user);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [listViewRef, setListViewRef] = useState({});
  const [loading, setLoading] = useState(true);

  async function fetchCheckins(fetchPage = 1) {
    const response = await api.get(
      `/students/${id}/checkins?page=${fetchPage}`
    );
    const checkins = response.data;
    if (checkins && checkins.length > 0) {
      const currentData = fetchPage === 1 ? [] : data;
      const fetchedData = [
        ...currentData,
        ...checkins.map(checkin => ({
          ...checkin,
          time: formatTime(checkin.date)
        }))
      ];
      setData(fetchedData);
      setPage(fetchPage);
    }
    setLoading(false);
  }

  async function handleCheckIn() {
    try {
      listViewRef.scrollToOffset({
        offset: 0,
        animated: true
      });
      const response = await api.post(`/students/${id}/checkins`);
      if (response.status === 200 && response.data.created_at) {
        setData([
          {
            index: data && data.length > 0 ? data[0].index + 1 : 1,
            time: formatTime(response.data.created_at)
          },
          ...data
        ]);
      } else if (response.status === 401) {
        dispatch(signOut());
      } else {
        Alert.alert('Falha ao fazer check-in!', response.data.error);
      }
    } catch (err) {
      console.tron.error(err);
      Alert.alert('Falha ao fazer check-in!', 'Tente novamente...');
    }
  }

  async function handleEndReached() {
    if (data.length / page === PAGE_SIZE) {
      setLoading(true);
      await fetchCheckins(page + 1);
    }
  }

  async function handleRefresh() {
    setLoading(true);
    setPage(1);
    await fetchCheckins();
  }

  useEffect(() => {
    fetchCheckins();
  }, []);

  return (
    <Container>
      <AddButton onPress={handleCheckIn}>Novo check-in</AddButton>
      <ListView
        data={data}
        keyExtractor={item => String(item.index)}
        ref={ref => setListViewRef(ref)}
        refreshing={loading}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <CheckIn>
            <Title>Check-in #{item.index}</Title>
            <Time>{item.time}</Time>
          </CheckIn>
        )}
      />
      {loading && page > 1 && (
        <ActivityIndicator size={30} style={{ paddingBottom: 20 }} />
      )}
    </Container>
  );
}
