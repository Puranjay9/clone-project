import { create } from 'zustand';
import { Exercise } from '@/types/types';

interface ExerciseStore{
    ExcersisesList: Exercise[];
    addExercise: (exercise: Exercise) => void;
    removeExercise: (exercise: Exercise) => void;
    clearAll : () => void;
}

const excerciseStore = create<ExerciseStore>((set) => ({
    ExcersisesList: [],
    addExercise(exercise) {
        set((state) => ({ ExcersisesList: [...state.ExcersisesList, exercise] }));
    },
    removeExercise(exercise) {
        set((state) => ({ ExcersisesList: state.ExcersisesList.filter((ex) => ex.name !== exercise.name) }));
    },
    clearAll() {
        set({ ExcersisesList: [] });
    },
}));

export default excerciseStore;