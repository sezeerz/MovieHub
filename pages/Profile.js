import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Image, ScrollView, FlatList, TouchableOpacity, Linking } from 'react-native';
import { globalStyles } from '../styles/global';
import BottomNav from '../components/bottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
    const [favMovies, setFavMovies] = useState([]);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => { 
        getFavoriteMovies();
        
        const interval = setInterval(() => {
            getFavoriteMovies();
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    const getFavoriteMovies = async () => {
        try {
            setError(null);
            const favMoviesJson = await AsyncStorage.getItem('favMovies');
            const moviesJson = await AsyncStorage.getItem('movies');
            
            if (!moviesJson) {
                throw new Error('Film listesi bulunamadı');
            }

            // Eğer favMoviesJson null ise, boş array olarak kabul et
            const favoriteIds = favMoviesJson ? JSON.parse(favMoviesJson) : [];
            const allMovies = JSON.parse(moviesJson);
             
            const favoriteMovies = favoriteIds.map(favId => 
                allMovies.find(movie => movie.id === favId)
            ).filter(movie => movie != null);
            
            setFavMovies(favoriteMovies);
        } catch (error) {
            console.log('Favoriler yüklenirken hata:', error);
            setError('Favoriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        }
    };

    const handleMoviePress = (movieId) => { 
        navigation.navigate('MovieView', {  movieId: movieId });
      };

    const renderMovieItem = ({ item }) => ( 
        <TouchableOpacity  onPress={() => handleMoviePress(item.id)} style={[globalStyles.mediumCard, { width: '46%', margin: '2%' }]}>
           <Image 
                source={{uri: item.poster_path}} 
                style={globalStyles.mediumCardImage}

            />
            <Text style={[globalStyles.smallText, {color: '#fff', textAlign: 'center'}]} numberOfLines={1}>

                {item.title}
            </Text>
        </TouchableOpacity> 
    );

    const openInstagram = () => {
        Linking.openURL('https://www.instagram.com/2sezz/');
    };

    useEffect(() => {
        navigation.setOptions({
          gestureEnabled: false
        });
      }, [navigation]);

    return (
        <SafeAreaView style={[globalStyles.container]}>
            <StatusBar style="light" />  
            <View style={[globalStyles.container, { position: 'relative' }]}> 
                <ScrollView style={{ flex: 1 }}>
                    <View style={globalStyles.contentWrapper}>  
                        <Image source={{uri: 'https://media.licdn.com/dms/image/v2/D4D03AQHFqQ_fxtIG1A/profile-displayphoto-shrink_800_800/B4DZQ2h7arHMAc-/0/1736081652362?e=1744243200&v=beta&t=Q-d3yta3l2yrjMVn6JhXDea_FWc3Dwqe1oYIggPIUyI'}} style={globalStyles.profileImage} />
                        <Text style={[globalStyles.h1title, {fontSize: 20, textAlign: 'center'}]}>Sezer Arslan</Text>
                        <Text style={[globalStyles.h2title, {textAlign: 'center', color: '#fff'}]}>@2sezz</Text>
                        <TouchableOpacity onPress={openInstagram}>
                            <Text style={{textAlign: 'center', color: '#fff'}}><Ionicons name="logo-instagram" size={10} color="white" /> Instagram</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={globalStyles.contentWrapper}>
                        <View style={[globalStyles.rowlist]}>  
                            <Text style={[globalStyles.h2title, {marginBottom: 20}]}> <Ionicons name="heart" size={12} color="white" /> Favorilerim</Text> 
                            {error ? (
                                <Text style={{color: 'red', textAlign: 'center', marginBottom: 10}}>
                                    {error}

                                </Text>
                            ) : favMovies.length === 0 ? (
                                <Text style={{color: '#fff', textAlign: 'center', marginBottom: 10}}>
                                    Henüz favori film eklenmemiş
                                </Text>
                            ) : (
                                <FlatList
                                    data={favMovies}
                                    renderItem={renderMovieItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={2}
                                    showsVerticalScrollIndicator={false}
                                    scrollEnabled={false}
                                    contentContainerStyle={{paddingTop: 20, paddingBottom: 100 }} 
                                />
                            )}
                        </View>
                    </View>
                </ScrollView>
                <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                    <BottomNav activeIcon="profile" />
                </View>
            </View>
        </SafeAreaView> 
    );
} 
