import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  padding: 0 20px;
  height: 45px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const TIcon = styled(Icon)`
  margin-right: 10px;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: '#999'
})`
  flex: 1;
  font-size: 15px;
  color: #666;
`;
