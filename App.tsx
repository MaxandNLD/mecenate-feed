// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './src/screens/FeedScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';

export type RootStackParamList = {
  Feed: undefined;
  PostDetail: {
    postId: string;
    postTitle: string;
    postContent: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
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
  );
}