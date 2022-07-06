import React from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store/store';

import { MenuProvider } from 'react-native-popup-menu';
import {Navigator} from './components/navigator/navigator';

export default function App() {

  return (
    <Provider store={store}>
      <MenuProvider>
        <Navigator/>
      </MenuProvider>
    </Provider>
  );
}

