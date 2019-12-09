import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';

export default {
  headerLayoutPreset: 'center',
  headerBackTitleVisible: false,
  defaultNavigationOptions: {
    headerTitle: () => <Header />,
    headerTintColor: '#ee4e62',
    headerTitleStyle: {
      fontWeight: 'bold'
    },
    headerStyle: {
      backgroundColor: '#fff'
    },
    headerBackImage: () => (
      <Icon
        name="chevron-left"
        size={24}
        color="#000"
        style={{ marginLeft: 20 }}
      />
    )
  }
};
