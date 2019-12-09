import { createStackNavigator } from 'react-navigation-stack';

import List from './List';
import headerConfig from '~/config/HeaderConfig';

export default createStackNavigator(
  {
    List
  },
  headerConfig
);
