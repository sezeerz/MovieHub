import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity, Modal, Pressable, ScrollView, Image, RefreshControl, FlatList } from 'react-native';
import { globalStyles } from '../styles/global';
import BottomNav from '../components/bottomNav';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; 

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeView, setActiveView] = useState('discover');
  const [continueWatching, setContinueWatching] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [recommended, setRecommended] = useState([]); 
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const distributeMovies = (movies) => {
    setContinueWatching(movies.slice(0, 6));
    setComingSoon(movies.slice(6, 9));
    setRecommended(movies.slice(9, 16));
  };

  const fetchAndDistributeMovies = async () => {
    try {
      setError(null);
      const response = await fetch('https://jsonfakery.com/movies/paginated');
      
      if (!response.ok) {
        throw new Error('Film verileri alınamadı');
      }
      
      const data = await response.json();
      const movies = data.data;
      
      if (!movies || !Array.isArray(movies)) {
        throw new Error('Geçersiz film verisi');
      }
      
      distributeMovies(movies);
      await AsyncStorage.setItem('movies', JSON.stringify(movies)); 
      return true;
    } catch (error) {
      console.error('Hata:', error);
      setError('Film verileri yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      return false;
    }
  };

  useEffect(() => {
    navigation.setOptions({
      gestureEnabled: false
    });
  }, [navigation]);

  useEffect(() => {
    const initializeMovies = async () => {
      try { 
        setError(null);
        const storedMovies = await AsyncStorage.getItem('movies');
        
        if (storedMovies) {
          const allMovies = JSON.parse(storedMovies);
          distributeMovies(allMovies);
        } else { 
          const success = await fetchAndDistributeMovies();
          if (!success) {
            setError('Film verileri yüklenemedi. Lütfen internet bağlantınızı kontrol edin.');
          }
        }
      } catch (error) {
        console.error('Hata:', error);
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };

    initializeMovies();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchAndDistributeMovies();
    setRefreshing(false);
  };

  const handleMoviePress = (movieId) => { 
    navigation.navigate('MovieView', {  movieId: movieId });
  };

  const sectionTitles = {
    continueWatching: 'İzlemeye Devam Et',
    comingSoon: 'Yakında Vizyonda',
    recommended: 'Bunlar da Hoşunuza Gidebilir'
  };

  const sectionStyles = {
    title: {
      ...globalStyles.h2title,
      marginTop: 40,
      marginBottom: 20
    },
    firstTitle: {
      ...globalStyles.h2title,
      marginBottom: 20
    }
  };

  const cardTypes = {
    small: {
      container: globalStyles.smallCard,
      image: globalStyles.smallCardImage,
      showProgress: true
    },
    medium: {
      container: globalStyles.mediumCard,
      image: globalStyles.mediumCardImage,
      showProgress: false
    }
  };

  const MovieCard = ({ movie, type, style = {} }) => {
    const cardConfig = cardTypes[type];
    
    return (
      <TouchableOpacity 
        key={movie.id} 
        style={[cardConfig.container, style]}
        onPress={() => handleMoviePress(movie.id)}
      >
        <Image 
          source={{uri: movie.poster_path}} 
          style={cardConfig.image} 
        /> 
        {cardConfig.showProgress && (
          <View style={globalStyles.progressBarContainer}>
            <View style={globalStyles.progressBar}>
              <View 
                style={[
                  globalStyles.progressBarFill,
                  { width: `${Math.floor(Math.random() * 85)}%` }
                ]}
              />
            </View>
          </View>
        )}
      </TouchableOpacity>  
    );
  };

  const MovieSection = ({ title, movies, cardType, style = {} }) => (
    <>
      <View style={globalStyles.rowList}>
        <Text style={title.isFirst ? sectionStyles.firstTitle : sectionStyles.title}>
          {sectionTitles[title.key]}
        </Text>
      </View>
      <ScrollView horizontal>
        {movies.map((movie, index) => (
          <MovieCard 
            key={index}
            movie={movie} 
            type={cardType}
            style={style}
          />
        ))}
      </ScrollView>
    </>
  ); 

  const renderContent = () => {
    if (error) {
      return (
        <View style={[globalStyles.contentWrapper, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>{error}</Text>
          <TouchableOpacity 
            style={{ padding: 10, backgroundColor: '#333', borderRadius: 5 }}
            onPress={onRefresh}
          >
            <Text style={{ color: '#fff' }}>Tekrar Dene</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch(activeView) {
      case 'lists':
        const categories = [
          { id: 'continueWatching', title: 'İzlemeye Devam Et', count: continueWatching.length },
          { id: 'comingSoon', title: 'Yakında Vizyonda', count: comingSoon.length },
          { id: 'recommended', title: 'Bunlar da Hoşunuza Gidebilir', count: recommended.length }
        ];

        return (
          <View style={globalStyles.contentWrapper}> 
            <FlatList
              data={categories}
              numColumns={2}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={globalStyles.categoryItem} 
                >
                  <Text style={globalStyles.categoryTitle}>{item.title}</Text>
                  <Text style={globalStyles.categoryCount}>{item.count} Film</Text>
                </TouchableOpacity>
              )}
              columnWrapperStyle={globalStyles.gridRow}
            />
          </View>
        );
      case 'discover':
      default:
        return (
          <ScrollView style={globalStyles.contentWrapper}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#fff" />
            }
          >  
            <MovieSection 
              title={{ key: 'continueWatching', isFirst: true }}
              movies={continueWatching}
              cardType="small"
            />

            <MovieSection 
              title={{ key: 'comingSoon', isFirst: false }}
              movies={comingSoon}
              cardType="medium"
            />

            <MovieSection 
              title={{ key: 'recommended', isFirst: false }}
              movies={recommended}
              cardType="medium"
              style={{ marginBottom: 120 }}
            />
          </ScrollView>
        );
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar style="light" />
      <View style={globalStyles.container}>
        <TouchableOpacity 
          style={[globalStyles.rowList, {padding: 20}]}
          onPress={() => setModalVisible(true)}
        >  
          <Text style={globalStyles.h1title}>
            {activeView === 'discover' ? 'Keşfet' : 'Listeler'}
          </Text>
          <Ionicons 
            name="chevron-down" 
            size={24} 
            color="white" 
            style={{ marginLeft: 5 }} 
          /> 
        </TouchableOpacity>

        {renderContent()}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)} 
        >
          <Pressable 
            onPress={() => setModalVisible(false)} 
            style={globalStyles.modalOverlay} 
          />
          <TouchableOpacity 
            style={globalStyles.modalContainer}
            onPress={() => setModalVisible(false)}
          >
            <View style={globalStyles.modalContent}>
              <TouchableOpacity onPress={() => {
                setActiveView('discover');
                setModalVisible(false);
              }}> 
                <Text style={[globalStyles.h2title, { color: activeView === 'discover' ? '#fff' : '#414141', marginBottom: 15 }]}>
                  Keşfet
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setActiveView('lists');
                setModalVisible(false);
              }}> 
                <Text style={[globalStyles.h2title, { color: activeView === 'lists' ? '#fff' : '#414141' }]}>
                  Listeler
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <BottomNav activeIcon="home" />
      </View>
    </SafeAreaView>
  );
} 
