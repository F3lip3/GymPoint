import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

export default function HelpOrders() {
  return <Text>LIST HELP ORDERS</Text>;
}

function tabBarIcon({ tintColor }) {
  return <Icon name="live-help" size={20} color={tintColor} />;
}

HelpOrders.navigationOptions = {
  tabBarLabel: 'Pedir Ajuda',
  tabBarIcon
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
