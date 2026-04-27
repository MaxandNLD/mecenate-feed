// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './src/screens/FeedScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Импорт QueryClientProvider

// Определяем параметры для стека навигации
export type RootStackParamList = {
  Feed: undefined;
  PostDetail: {
    postId: string;
    postTitle: string;
    postContent: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Создаем экземпляр QueryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    // Оборачиваем все приложение в QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Feed">
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={{ title: 'Лента Публикаций' }}
          />
          <Stack.Screen
            name="PostDetail"
            component={PostDetailScreen}
            options={({ route }) => ({
              title: route.params.postTitle,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}