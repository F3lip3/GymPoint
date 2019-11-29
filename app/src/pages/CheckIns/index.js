import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

export default function CheckIns() {
  return <View />;
}

function tabBarIcon({ tintColor }) {
  return <Icon name="edit-location" size={20} color={tintColor} />;
}

CheckIns.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired
};
