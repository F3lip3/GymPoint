import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

export const HelpOrder = styled.TouchableOpacity`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  margin-bottom: 10px;
  padding: 20px;
  max-height: 150px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const StatusBox = styled.View`
  flex-direction: row;
`;

export const StatusIcon = styled(Icon)`
  color: ${props => (props.answered ? '#42cb59' : '#999')};
  margin-right: 8px;
`;

export const Status = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.answered ? '#42cb59' : '#999')};
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Content = styled.View``;

export const Question = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #666;
`;
