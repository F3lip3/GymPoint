import { createStackNavigator } from 'react-navigation-stack';

import List from './List';
import Show from './Show';
import Create from './Create';
import headerConfig from '~/config/HeaderConfig';

export default createStackNavigator(
  {
    List,
    Show,
    Create
  },
  headerConfig
);
