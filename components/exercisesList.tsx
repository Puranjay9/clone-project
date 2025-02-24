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
        <View style={{paddingBottom: 20}}>
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
    const height = useSharedValue(40);
    const cardRef = useRef<View>(null);
    const {addExercise , removeExercise} = excerciseStore();

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withSpring(height.value, {
                damping: 60,
                stiffness: 60
            }),
            overflow: 'hidden'
        };
    });

    const measureAndAnimate = () => {
        if (showInstructions) {
            if (cardRef.current) {
                cardRef.current?.measure((x, y, width, measuredHeight) => {
                    height.value = measuredHeight + 30;
                });
            }
        } else {
            height.value = 140;
        }
    };

    useLayoutEffect(() => {
        measureAndAnimate();
    }, [showInstructions]);

    return (
        <Pressable onPress={() => setShowInstructions(!showInstructions)}>
            <Animated.View style={[styles.exerciseItem, animatedStyle]}>
                <View ref={cardRef} style={{opacity: 1}}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text>Exercise Type: {item.type}</Text>
                    <Text>{item.muscle}</Text>
                    <Text>{item.equipment}</Text>
                    <Text>Level: {item.difficulty}</Text>
                    <Pressable onPress={() => addExercise(item)}>
                        <Text>Add</Text>
                    </Pressable>
                    {/* Instructions */}
                    <View style={{display: showInstructions ? 'flex' : 'none'}}>
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
});