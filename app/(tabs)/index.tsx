import React, {Suspense} from 'react';
import { View , Text} from 'react-native';
import ExercisesList from '@/components/exercisesList';

function App() {
  return (
        <View>
          <ExercisesList />
        </View>
  );
}

export default App;
