import { View, Text , FlatList} from 'react-native'
import React from 'react'
import excerciseStore from '@/store/excerciseStore'

export default function your_excersise() {

  const {ExcersisesList} = excerciseStore();
  
  return (
    <View>
      <FlatList
      data={ExcersisesList}
      renderItem={({ item, index }) => (
        <View style={{ padding: 10 }}>
        <Text>{item.name}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}