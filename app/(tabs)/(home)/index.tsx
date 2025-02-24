import React, {Suspense} from 'react';
import { View, Text, Button } from 'react-native';
import ExercisesList from '@/components/exercisesList';
import { useRouter } from 'expo-router';

function App() {
  const router = useRouter();

  return (
        <View>
          <Button title="Your Excersices" onPress={() => router.push('/test')} />
          <ExercisesList />
        </View>
  );
}

export default App;
