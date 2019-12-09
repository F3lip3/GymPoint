import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';
import Header from './components/Header';

export default function App() {
  const headerOptions = {
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

  const signed = useSelector(state => state.auth.signed);
  const Routes = createRouter(headerOptions, signed);

  return <Routes />;
}
