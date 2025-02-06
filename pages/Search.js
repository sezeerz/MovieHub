import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput, Keyboard, TouchableWithoutFeedback, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { globalStyles } from '../styles/global';
import BottomNav from '../components/bottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Search() {
  const inputRef = useRef(null);
  const [searchText, setSearchText] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const searchMovies = async (text) => {
    if (text.length < 2) {
      setMovies([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const moviesJson = await AsyncStorage.getItem('movies');
      
      if (!moviesJson) {
        throw new Error('Film veritabanı bulunamadı');
      }

      const movieList = JSON.parse(moviesJson);
      
      if (!Array.isArray(movieList)) {
        throw new Error('Geçersiz film verisi');
      }
      
      const filteredMovies = movieList.filter(movie => 
        movie.original_title.toLowerCase().includes(text.toLowerCase())
      );
      
      setMovies(filteredMovies);
    } catch (error) {
      console.log('Film arama hatası:', error);
      setError('Arama yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMoviePress = (movieId) => { 
    navigation.navigate('MovieView', { movieId: movieId });
  };

  const renderMovieItem = ({ item }) => ( 
    <TouchableOpacity onPress={() => handleMoviePress(item.id)} style={[globalStyles.mediumCard, { width: '46%', margin: '2%', marginBottom: 40 }]}>
      <Image 
        source={{uri: item.poster_path}} 
        style={globalStyles.mediumCardImage}
      />
      <Text style={[globalStyles.smallText, {color: '#fff', textAlign: 'center', marginTop: 5}]} numberOfLines={1}>
        {item.original_title}
      </Text>
    </TouchableOpacity> 
  );

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false
    });
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[globalStyles.container]}>
        <StatusBar style="light" />  
        <View style={[globalStyles.container, { position: 'relative' }]}> 
          <View style={globalStyles.searchContainer}>
            <Ionicons name="search" size={24} color="#414141" />
            <TextInput 
              ref={inputRef}
              placeholder="Film Ara (en az 2 karakter)" 
              placeholderTextColor="#414141" 
              style={globalStyles.searchInput}
              autoCorrect={false}
              autoCapitalize="none"
              autoComplete="off"
              maxLength={30}
              numberOfLines={1}
              value={searchText}
              onChangeText={(text) => {
                setSearchText(text);
                searchMovies(text);
              }}
            />
          </View>   

          {error ? (
            <Text style={{color: 'red', textAlign: 'center', marginTop: 20}}>{error}</Text>
          ) : loading ? (
            <ActivityIndicator size="small" color="#fff" style={{marginTop: 20}}/>
          ) : movies.length > 0 ? (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <FlatList
                data={movies}
                renderItem={renderMovieItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={{paddingTop: 20, paddingBottom: 100 }} 
                showsVerticalScrollIndicator={false}
                onScrollBeginDrag={() => Keyboard.dismiss()}
              /> 
            </TouchableWithoutFeedback>
          ) : searchText.length >= 2 ? (
            <Text style={{color: '#fff', textAlign: 'center', marginTop: 20}}>Film bulunamadı</Text>
          ) : null}

        </View>   
        <View style={{ position: 'absolute', bottom: 30, left: 0, right: 0 }}>
          <BottomNav activeIcon="search" />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
} 
