import { StatusBar } from 'expo-status-bar';
import { Text, View, ActivityIndicator, Image, ScrollView, Animated, Pressable, Share } from 'react-native';
import { globalStyles } from '../styles/global'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function MovieView({ route }) {
  const navigation = useNavigation();
  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollY = new Animated.Value(0);
  const { movieId } = route?.params || {};
  
  const posterHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [500, 200],
    extrapolate: 'clamp'
  });

  const posterScale = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0.8],
    extrapolate: 'clamp'
  });

  useEffect(() => {
    const loadMovieData = async () => {
      if (!movieId) {
        setError('Film ID\'si bulunamadı');
        setLoading(false);
        return;
      }

      try {
        setError(null);
        setLoading(true);
        
        const moviesJson = await AsyncStorage.getItem('movies');
        if (!moviesJson) {
          throw new Error('Film veritabanı bulunamadı');
        }

        const movies = JSON.parse(moviesJson);
        const foundMovie = movies.find(m => m.id === movieId);
        
        if (!foundMovie) {
          throw new Error('Film bulunamadı');
        }

        setMovie(foundMovie);
        await checkFavorite();
      } catch (error) {
        console.error('Film verisi çekilirken hata:', error);
        setError(error.message || 'Film yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    const checkFavorite = async () => {
      try {
        const favMovies = await AsyncStorage.getItem('favMovies');
        const favorites = favMovies ? JSON.parse(favMovies) : [];
        setIsFavorite(favorites.includes(movieId));
      } catch (error) {
        console.error('Favori kontrolünde hata:', error);
      }
    };

    loadMovieData();
  }, [movieId]);

  const toggleShare = async () => {
    if (movie) {
      try {
        const shareData = {
          title: movie.original_title,
          message: `${movie.original_title}\n\nİzlemek için tıklayın: https://www.themoviedb.org/movie/${movie.id}` //random bir link
        };
        await Share.share(shareData);
      } catch (error) {
        console.error('Paylaşım sırasında hata:', error);
        alert('Paylaşım yapılırken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    }
  };

  const toggleFavorite = async () => {
    try {
      const favMovies = await AsyncStorage.getItem('favMovies');
      let favorites = favMovies ? JSON.parse(favMovies) : [];
      
      if (isFavorite) {
        favorites = favorites.filter(id => id !== movieId);
      } else {
        favorites.push(movieId);
      }
      
      await AsyncStorage.setItem('favMovies', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Favori işleminde hata:', error);
      alert('Favori işlemi gerçekleştirilemedi. Lütfen tekrar deneyin.');
    }
  };

  if (error) {
    return (
      <SafeAreaView style={[globalStyles.container]}>
        <StatusBar style="light" />
        <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: 'red', marginBottom: 20 }}>{error}</Text>
          <Pressable 
            style={[globalStyles.button, { backgroundColor: '#333' }]} 
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: '#fff' }}>Geri Dön</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <StatusBar style="light" />  
      <View style={[globalStyles.container]}>
        <Pressable style={globalStyles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </Pressable>
        <Pressable style={globalStyles.favoriteButton} onPress={toggleFavorite}>
          <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={24} color="red" />
        </Pressable>
        <Pressable style={globalStyles.shareButton} onPress={toggleShare}>
          <Ionicons name="share-outline" size={24} color="black" />
        </Pressable>
        <View style={globalStyles.contentWrapper}>  


          {loading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : movie ? (
            <Animated.ScrollView
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            >
              <Animated.View style={[
                globalStyles.cardViewContainer,
                { height: posterHeight }
              ]}> 
                <Animated.View style={[
                  globalStyles.cardView,
                  { transform: [{ scale: posterScale }] }
                ]}> 
                  <Image 
                    source={{uri: movie.poster_path}} 
                    style={globalStyles.posterImage}
                  />
                  <View style={globalStyles.cardViewContent}> 
                    <Text style={[globalStyles.h1title, {color: '#fff', fontWeight: 'bold'}]}>
                      {movie.original_title}
                    </Text>  
                    <View style={[globalStyles.rowList, {gap: 10}]}>
                      <Text style={[globalStyles.secondaryText]}>
                        <Ionicons name="star" size={10} color="#fff" /> {movie.vote_average + '/10' || 'Belirtilmemiş'}
                      </Text>   
                      <Text style={[globalStyles.secondaryText]}>
                        <Ionicons name="people" size={10} color="#fff" /> {movie.popularity || 'Belirtilmemiş'} 
                      </Text>  
                    </View>
                  </View> 
                </Animated.View>  
              </Animated.View>  
              <View style={globalStyles.overviewContainer}>
                <View style={globalStyles.jokerLine} /> 
                <Text style={[globalStyles.h1title, {textAlign: 'center', marginVertical: 10}]}>{movie.original_title}</Text>
                <View style={[globalStyles.detailsContainer]}>
                    <View style={[globalStyles.detailRow]}>
                    <Text style={[globalStyles.detailLabel]}>İmdb Puanı:</Text>
                    <Text style={[globalStyles.secondaryText]}>{movie.vote_average + '/10' || 'Belirtilmemiş'}</Text>
                  </View>
                  <View style={[globalStyles.detailRow]}>
                    <Text style={[globalStyles.detailLabel]}>İzlenme:</Text>
                    <Text style={[globalStyles.secondaryText]}>{movie.popularity || 'Belirtilmemiş'}</Text>
                  </View> 
                  <View style={[globalStyles.detailRow]}>
                    <Text style={[globalStyles.detailLabel]}>Yönetmen:</Text>
                    <Text style={[globalStyles.secondaryText]}>{movie.director || 'Belirtilmemiş'}</Text>
                  </View>
                  <View style={[globalStyles.detailRow]}>
                    <Text style={[globalStyles.detailLabel]}>Kategori:</Text>
                    <Text style={[globalStyles.secondaryText]}>{movie.genres?.join(', ') || 'Belirtilmemiş'}</Text>
                  </View>
                  <View style={[globalStyles.detailRow]}>
                    <Text style={[globalStyles.detailLabel]}>Çıkış Tarihi:</Text>
                    <Text style={[globalStyles.secondaryText]}>{movie.release_date || 'Belirtilmemiş'}</Text>
                  </View>
                  <View style={[globalStyles.detailRow]}>
                    <Text style={[globalStyles.detailLabel]}>Süre:</Text>
                    <Text style={[globalStyles.secondaryText]}>{movie.runtime ? `${movie.runtime} dk` : 'Belirtilmemiş'}</Text>
                  </View>
                </View>
                <Text style={[globalStyles.overviewTitle]}>Özet</Text>
                <Text style={[globalStyles.secondaryText]}>{movie.overview}</Text>
                
                <Text style={[globalStyles.overviewTitle]}>Oyuncu Kadrosu</Text>
                <View style={globalStyles.castContainer}>
                  {movie.cast && movie.cast.length > 0 ? (
                    movie.cast.map((actor) => (
                      <View key={actor.id} style={globalStyles.castMember}>
                        <Image 
                          source={{uri: actor.profile_path}} 
                          style={globalStyles.castImage} 
                        />
                        <View style={globalStyles.castInfo}>
                          <Text style={[globalStyles.secondaryText, {fontWeight: 'bold'}]}>
                            {actor.name}
                          </Text>
                          <Text style={globalStyles.secondaryText}>
                            {actor.character}
                          </Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={[globalStyles.secondaryText]}>Oyuncu kadrosu bilgisi bulunamadı.</Text>
                  )}
                </View>
              </View>
            </Animated.ScrollView>
          ) : (
            <Text style={{ color: '#fff', textAlign: 'center' }}>
              Film bilgileri yüklenemedi
            </Text>
          )}
        </View> 
      </View>
    </SafeAreaView> 
  );
} 
