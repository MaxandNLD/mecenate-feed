// src/App.tsx
import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { queryClient } from './src/queryClient';
import FeedScreen from './src/screens/FeedScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';

const Stack = createNativeStackNavigator();

type RootStackParamList = {
  Feed: undefined;
  PostDetail: {
    postId: string;
    postTitle: string;
    postContent: string;
  };
};

const App = observer(() => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Feed"
              component={FeedScreen}
              options={{ title: 'Лента Мецената' }}
            />
            <Stack.Screen
              name="PostDetail"
              component={PostDetailScreen}
              options={{ title: 'Пост' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
});

export default App;
export type { RootStackParamList };