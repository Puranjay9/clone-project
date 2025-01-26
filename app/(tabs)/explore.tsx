import * as React from 'react';
import { Button, View , Text } from 'react-native';
//import { createDrawerNavigator } from '@react-navigation/drawer';
// import {
//   createStaticNavigation,
//   useNavigation,
//   useIsFocused,
// } from '@react-navigation/native';
console.log("loaded main")
//const HomeScreen = React.lazy(() => import('./HomeScreen'));
// function NotificationsScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button  onPress={() => navigation.navigate('Notifications')} title="Go to notifications" />
//     </View>
//   );
// }

const HomeScreen = () =>{
  return  (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Go to home screen</Text> 
          </View>
  )
}

const HomeScreenTest = React.lazy(() => 
  new Promise<{default: React.ComponentType}>((resolve) => {
    setTimeout(() => {
      resolve({
        default: () => (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Go to home screen</Text> 
          </View>
        )
      });
    }, 2000);
  })
);

function HomeStack() {
  return (
       <React.Suspense>
          <HomeScreenTest/>
      </React.Suspense>
  );
}



// const Drawer = createDrawerNavigator({
//   screens: {
//     Home: NotificationsScreen,
//     Notifications: HomeStack,
//   },
// });

//const Navigation = createStaticNavigation(Drawer);

export default function App() {
  return HomeStack();
}
