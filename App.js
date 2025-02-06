import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import MovieView from './pages/MovieView';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300
        }}
      >
        <Stack.Screen name="Home"  component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="MovieView" component={MovieView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 
