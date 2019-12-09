import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

export const AddButton = styled(Button)`
  margin: 20px;
  width: 100%;
`;

export const ListView = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 20 }
})`
  width: 100%;
`;

export const CheckIn = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 20px;
  height: 45px;
`;

export const Title = styled.Text`
  color: #444;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: #666;
`;
