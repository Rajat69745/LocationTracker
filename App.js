

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationTracker from './LocationTracker';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>


            <Stack.Screen name="LocationTracker" component={LocationTracker} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
