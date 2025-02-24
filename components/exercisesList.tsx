import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import apiCall from '@/hooks/api/apicall';

interface Exercise {
    name: string;
    type: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    instructions: string;
}

export default function ExercisesList() {

    const [exercisesList, setexercisesList] = useState<Exercise[]>([]);
    
    useEffect(() => {
        const fetchExcersises = async () => {
            try {
            const data = await apiCall('https://api.api-ninjas.com/v1/exercises');
            setexercisesList(data);
            } catch (error) {
            console.error("Error fetching exercises:", error);
            }
        };
        fetchExcersises();
    }, []);

    console.log("ExercisesList:", exercisesList);

  return (
    <View style={{paddingBottom : 20}}>
      <Text>ExercisesList</Text>
      <FlatList
        data={exercisesList}
        renderItem={({ item }: { item: Exercise }) => (
          exercisesItem({ item })
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const exercisesItem = ({ item }: { item: Exercise }) => {

    return(
        <View  style={styles.exerciseItem}>
            <Text  style = {styles.title}>{item.name}</Text>
            <Text>{item.type}</Text>
            <Text>{item.muscle}</Text>
            <Text>{item.equipment}</Text>
            <Text>{item.difficulty}</Text>
            <Text  style = {styles.instructions}>{item.instructions}</Text>
        </View>
    )
}


const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: '#09ede9'
        },
        exerciseItem: {
            flex: 1 ,
            marginBottom: 16,
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#f5f5f5',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4
        },
        title: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 8
        },
        instructions: {
            fontSize: 14,
            color: '#333',
            marginTop: 8
        }
    }
);