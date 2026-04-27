// src/screens/FeedScreen.tsx
import React, { useState } from 'react'; // Убираем useEffect, оставляем useState для пагинации
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import PostItem from '../components/PostItem';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { useQuery } from '@tanstack/react-query'; // Импорт useQuery

// Определяем тип для поста, чтобы он соответствовал API JSONPlaceholder
type Post = {
  userId: number; // JSONPlaceholder использует userId
  id: number;     // JSONPlaceholder использует id как number
  title: string;
  body: string;   // JSONPlaceholder использует 'body' вместо 'content'
};

type FeedScreenNavigationProp = NavigationProp<RootStackParamList>;

// Функция для получения данных с API
const fetchPosts = async (): Promise<Post[]> => {
  // JSONPlaceholder использует 'body' для контента и 'id' как number
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const FeedScreen: React.FC = () => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  // Используем useQuery для загрузки данных
  const {
    data: posts,        // Данные (список постов)
    isLoading,          // Состояние загрузки (первая загрузка)
    isFetching,         // Состояние загрузки (любая фоновая загрузка, включая refresh)
    isError,            // Есть ли ошибка
    error,              // Объект ошибки
    refetch             // Функция для ручного обновления (используется в RefreshControl)
  } = useQuery<Post[]>({
    queryKey: ['posts'], // Уникальный ключ для этого запроса
    queryFn: fetchPosts, // Функция, которая выполнит запрос
    staleTime: 5 * 60 * 1000, // Данные считаются свежими 5 минут
    // gcTime: 10 * 60 * 1000, // Время хранения кешированных данных (опционально)
  });

  // Для пагинации пока не будем реализовывать, сначала базовую загрузку
  // const [page, setPage] = useState(1);
  // const { data: posts, isLoading, isError, error, refetch, isFetchingNextPage, fetchNextPage } = useInfiniteQuery(...);

  const handleReadPress = (postId: number, postTitle: string, postContent: string) => {
    // Передаем postId, postTitle и postContent на экран детализации
    navigation.navigate('PostDetail', {
      postId: String(postId), // Преобразуем id в строку, как ожидается в RootStackParamList
      postTitle,
      postContent,
    });
  };

  // Отображение индикатора загрузки
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" style={styles.loadingIndicator} />
      </SafeAreaView>
    );
  }

  // Отображение ошибки
  if (isError) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Ошибка загрузки данных:</Text>
          <Text style={styles.errorDetails}>{error?.message}</Text>
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
          <Text style={styles.retryText}>Потяните вниз, чтобы обновить</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Отображение списка постов
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Лента Мецената</Text>
      </View>
      <FlatList
        data={posts} // Используем данные из useQuery
        keyExtractor={(item) => String(item.id)} // Ключ должен быть строкой
        renderItem={({ item }) => (
          <PostItem
            title={item.title}
            // JSONPlaceholder не предоставляет автора и дату, поэтому временно убираем их или используем заглушки
            author="Unknown Author" // Заглушка
            date="Unknown Date"    // Заглушка
            onReadPress={() => handleReadPress(item.id, item.title, item.body)} // Передаем item.body
          />
        )}
        contentContainerStyle={styles.listContent}
        // RefreshControl для pull-to-refresh
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
        // Для пагинации (пока отключено)
        // onEndReached={() => {
        //   if (!isFetchingNextPage && hasNextPage) {
        //     fetchNextPage();
        //   }
        // }}
        // onEndReachedThreshold={0.5}
      />
      {isFetching && <ActivityIndicator size="large" color="#007bff" style={styles.fetchingIndicator} />}
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
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 10,
  },
  errorDetails: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryText: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  fetchingIndicator: { // Индикатор во время фоновой загрузки (например, при pull-to-refresh)
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default FeedScreen;