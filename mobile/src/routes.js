/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from './pages/SignIn';
import CheckInsScreen from './pages/CheckIns';
import HelpOrdersScreen from './pages/HelpOrders';

export default (headerOptions, signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn
        }),
        App: createBottomTabNavigator(
          {
            CheckIns: {
              screen: CheckInsScreen,
              navigationOptions: {
                title: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                )
              }
            },
            HelpOrders: {
              screen: HelpOrdersScreen,
              navigationOptions: {
                title: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                )
              }
            }
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
