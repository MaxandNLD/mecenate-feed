// src/components/PostItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

type PostItemProps = {
  title: string;
  author?: string;
  date?: string;
  onReadPress: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ title, author, date, onReadPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.meta}>
          {author && (
            <View style={styles.metaItem}>
              <MaterialIcons name="person" size={16} color="#666" />
              <Text style={styles.author}>{author}</Text>
            </View>
          )}
          {date && (
            <View style={styles.metaItem}>
              <MaterialIcons name="calendar-today" size={16} color="#666" />
              <Text style={styles.date}>{date}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.button} onPress={onReadPress}>
          <MaterialCommunityIcons name="book-open" size={16} color="#fff" />
          <Text style={styles.buttonText}>Читать</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 2,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default PostItem;