import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from './pages/SignIn';
import CheckIns from './pages/CheckIns';
import HelpOrderList from './pages/HelpOrders/List';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn
        }),
        App: createBottomTabNavigator(
          {
            CheckIns,
            HelpOrderList
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#ee4e62',
              inactiveTintColor: '#999'
            }
          }
        )
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign'
      }
    )
  );
