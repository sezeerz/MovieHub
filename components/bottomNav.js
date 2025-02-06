import { View, Text, Pressable } from 'react-native';  
import { globalStyles } from '../styles/global'; 
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function BottomNav({ activeIcon = "none", iconColor = "#414141" }) {
  const navigation = useNavigation();
  
  return (
    <View style={globalStyles.container}>
       <View style={globalStyles.navbar}>
        <Pressable 
            onPress={() => navigation.navigate('Home')}  
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                globalStyles.navbarItem, 
                globalStyles.activeNavbarItem
            ]}>
            <Ionicons name="home" size={24} color={activeIcon === "home" ? "#FFFFFF" : iconColor} />  

            <Text style={[globalStyles.navbarText, {color: activeIcon === "home" ? "#FFFFFF" : iconColor}]}>Keşfet</Text>
        </Pressable>  

        <Pressable 
            onPress={() => navigation.navigate('Search')}
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                globalStyles.navbarItem, 
                globalStyles.activeNavbarItem
            ]}>
            <Ionicons name="search" size={24} color={activeIcon === "search" ? "#FFFFFF" : iconColor} /> 
            <Text style={[globalStyles.navbarText, {color: activeIcon === "search" ? "#FFFFFF" : iconColor}]}>Ara</Text>
        </Pressable> 
        
        <Pressable 
            onPress={() => navigation.navigate('Profile')}
            style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                globalStyles.navbarItem, 
                globalStyles.activeNavbarItem
            ]}>
            <Ionicons name="person" size={24} color={activeIcon === "profile" ? "#FFFFFF" : iconColor} /> 
            <Text style={[globalStyles.navbarText, {color: activeIcon === "profile" ? "#FFFFFF" : iconColor}]}>Profil</Text> 
        </Pressable> 
       </View> 
    </View>

  );
} 