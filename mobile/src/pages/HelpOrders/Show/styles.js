import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

export const Box = styled.View`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  margin: 20px 0;
  padding: 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Content = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #666;
`;
