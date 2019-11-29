import React from 'react';
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
    }
  }
};
