import React, { useState } from 'react';
import { AppLoading } from "expo";
import {NavigationContainer} from '@react-navigation/native';
import { Image, StatusBar } from 'react-native';
import { Asset } from 'expo-asset';
import {Ionicons} from '@expo/vector-icons';
import * as Font from 'expo-font';
import Stack from './navigation/Stack';

// 이미지들을 주면 미리 로드한다.
const cacheImages = (images) => images.map(image => {
  if(typeof image === 'string'){
    // url 형식이면 이미지 다운로드
    return Image.prefetch(image)
  }else{
    return Asset.fromModule(image).downloadAsync();
  }
});

// 내가 원하는 폰트를 미리 로드해놓는다.
const cacheFonts = fonts => fonts.map(font => [Font.loadAsync(font), Font.loadAsync(font)]);

export default function App() {

  const [isReady, setIsReady] = useState(false);

  const loadAssets = async () => {

    const images = cacheImages([
      "https://images.pexels.com/photos/850359/pexels-photo-850359.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      require("./assets/splash.png") 
    ]);
    
    // font 다운로드
    const fonts = cacheFonts([Ionicons.font]);
    
    // 하나의 Promise 배열로 만들어 리턴
    return await Promise.all([...images, ...fonts]);
  };
  
  const onFinish = () =>  setIsReady(true);

  // true면 null, false 면 로딩화면
  return isReady ? (
    <>
      <NavigationContainer>
        <Stack/>
      </NavigationContainer>
      <StatusBar barStyle="light-content"/>  
    </>
  ) : (
    
    <AppLoading 
      // promise를 리턴하는 함수
      startAsync={loadAssets} 
      onFinish={onFinish}
      onError={console.error} 
    />
  );
};