// src/screens/PostDetailScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

type PostDetailRouteParams = {
  PostDetail: {
    postId: string;
    postTitle: string;
    postContent: string;
  };
};

type PostDetailScreenRouteProp = RouteProp<PostDetailRouteParams, 'PostDetail'>;

const PostDetailScreen: React.FC = () => {
  const route = useRoute<PostDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { postTitle, postContent } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons name="article" size={24} color="#007bff" />
          <Text style={styles.title}>{postTitle}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentText}>{postContent}</Text>
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back" size={16} color="#fff" />
        <Text style={styles.backButtonText}>Назад к ленте</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  backButton: {
    backgroundColor: '#007bff',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 5,
    flexDirection: 'row',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default PostDetailScreen;