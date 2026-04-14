// src/screens/FeedScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import PostItem from '../components/PostItem';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

// Убираем axios, так как будем использовать локальные данные

type Post = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
};

type FeedScreenNavigationProp = NavigationProp<RootStackParamList>;

const FeedScreen: React.FC = () => {
  // Локальные данные (замените на свои)
  const [posts] = useState<Post[]>([
    {
      id: '1',
      title: 'Новость дня: Expo улучшает разработку!',
      content: 'Expo выпустил новую версию с улучшенной производительностью и новыми инструментами для разработчиков.',
      author: 'Expo Team',
      date: '20 мая 2024',
    },
    {
      id: '2',
      title: 'React Native 0.72: что нового?',
      content: 'В новой версии React Native 0.72 добавлена поддержка новых API и улучшена производительность.',
      author: 'React Native Team',
      date: '18 мая 2024',
    },
    {
      id: '3',
      title: 'TypeScript в мобильной разработке',
      content: 'TypeScript помогает избежать ошибок и улучшает читаемость кода.',
      author: 'TypeScript Team',
      date: '15 мая 2024',
    },
  ]);

  const navigation = useNavigation<FeedScreenNavigationProp>();

  const handleReadPress = (postId: string, postTitle: string, postContent: string) => {
    navigation.navigate('PostDetail', {
      postId,
      postTitle,
      postContent,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Лента Мецената</Text>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem
            title={item.title}
            author={item.author}
            date={item.date}
            onReadPress={() => handleReadPress(item.id, item.title, item.content)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 15,
  },
});

export default FeedScreen;