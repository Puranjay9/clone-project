import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useRef, useState , useLayoutEffect } from 'react'
import apiCall from '@/hooks/api/apicall';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Exercise } from '@/types/types';
import excerciseStore from '@/store/excerciseStore'

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

    return (
        <View style={{paddingBottom: 50}}>
            <Text>ExercisesList</Text>
            <FlatList
                data={exercisesList}
                renderItem={({ item }) => <ExercisesItem item={item} />}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const ExercisesItem = ({ item }: { item: Exercise }) => {
    const [showInstructions, setShowInstructions] = useState(false);
    const height = useSharedValue(140);
    const [instructionsHeight, setInstructionsHeight] = useState(0);
    const {addExercise , removeExercise} = excerciseStore();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withSpring(height.value, {
                damping: 60,
                stiffness: 60
            }),
        };
    });

    useEffect(() => {
        if (showInstructions) {
            height.value = 140 + instructionsHeight;
        } else {
            height.value = 140;
        }
    }, [showInstructions, instructionsHeight]);

    const handleLayout = (event: { nativeEvent: { layout: { height: any; }; }; }) => {
        const { height: layoutHeight } = event.nativeEvent.layout ;
        setInstructionsHeight(layoutHeight);
    };

    return (
        <Pressable onPress={() => setShowInstructions(!showInstructions)}>
            <Animated.View style={[styles.exerciseItem, animatedStyle]}>
                <View style={{opacity: 1 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>Exercise Type: {item.type}</Text>
                    <Text>{item.muscle}</Text>
                    <Text>{item.equipment}</Text>
                    <Text>Level: {item.difficulty}</Text>
                    <Pressable onPress={() => addExercise(item)}>
                        <Text>Add</Text>
                    </Pressable>
                    {/* Instructions */}
                    <View onLayout={handleLayout}>
                        <Text style={styles.instructions}>{item.instructions}</Text>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#09ede9'
    },
    exerciseItem: {
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 8,
        marginHorizontal: 16,
        padding: 12,
        borderRadius: 8,
        backgroundColor: '#09ede9',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden'
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
});