MovieHub, React Native ve Expo kullanılarak geliştirilmiş bir mobil film uygulamasıdır.

## 🚀 Kurulum

### Ön Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn
- Expo CLI
- Android Studio (Android için) veya Xcode (iOS için)
- Expo Go uygulaması Android veya iOS cihazda test için (Fiziksel cihazda test edilir)

### Kurulum Adımları

1. Projeyi klonlayın:
   - `git clone https://github.com/sezeerz/MovieHub.git` komutunu çalıştırın
   - `cd MovieHub` komutunu çalıştırın
   - `npm install` komutunu çalıştırın
   - `npm install -g expo-cli` komutunu çalıştırın
   - `npx expo install @react-navigation/native @react-navigation/native-stack @react-native-async-storage/async-storage react-native-screens react-native-safe-area-context` komutunu çalıştırın
   - `npx expo start` komutunu çalıştırın

2. Uygulamayı test etmek için:

   - 📱 Fiziksel cihazda test:
     - Android veya iOS cihazınıza Expo Go uygulamasını yükleyin 
     - Expo Go uygulamasını açın ve QR kodu okutun
   

   - 💻 Emülatörde test:
     - Android için: `a` tuşuna basın
     - iOS için: `i` tuşuna basın

## 📱 Özellikler

- Film arama
- Film detayları görüntüleme
- Profil Sayfası
- Alt Navigasyon Menüsü
- Paylaşma
- En çok arananlar
- Favorilere ekleme 

## 🛠️ Kullanılan Teknolojiler

- React Native
- Expo  

## 🛠️ Kullanılan Modüller

- "@react-native-async-storage/async-storage": "^2.1.1"
- "@react-navigation/native": "^7.0.14"
- "@react-navigation/native-stack": "^7.2.0"
- "expo": "~52.0.30"
- "expo-status-bar": "~2.0.1"
- "react": "18.3.1"
- "react-native": "0.76.6"
- "react-native-safe-area-context": "4.12.0"
- "react-native-screens": "~4.4.0"

## 📝 Notlar
  
- Uygulama içerisinde veritabanı kullanılmamıştır.
- Kullanıcı verileri AsyncStorage ile saklanmaktadır.
- Film verileri https://jsonfakery.com/movies/paginated üzerinden alınmaktadır.
- Uygulama içerisinde filmleri pull to refresh ile yükleyebilirsiniz.
- Her pull to refresh işlemi yapıldığında yeni film verileri alınır ve eski veriler silinir.(Favorilerdeki filmler dahil)  
- Uygulamayı ilk kez çalıştırırken tüm bağımlılıkların yüklü olduğundan emin olun 
- Herhangi bir hata durumunda `npm install` komutunu tekrar çalıştırın
- Expo Go uygulamasının güncel versiyonunu kullandığınızdan emin olun 
- Node.js sürümünüzün proje gereksinimleriyle uyumlu olduğundan emin olun 