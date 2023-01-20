/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React from 'react';
import {name as appName} from './app.json';
import {NativeBaseProvider} from 'native-base';

const RNRedux = () => {
  return (
    <NativeBaseProvider>
      <App />
    </NativeBaseProvider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);
