// src/components/PostItem.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Только эта иконка нужна

type PostItemProps = {
  title: string;
  // author?: string; // Убираем автора, так как API не предоставляет
  // date?: string;   // Убираем дату
  onReadPress: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ title, onReadPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>

        {/* Убрали блок с автором и датой */}
        {/* {(author || date) && (
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
        )} */}

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
    elevation: 2, // Тень для Android
    // Для iOS
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
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
  // meta: { // Убираем стили для meta, т.к. оно удалено
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 10,
  // },
  // metaItem: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // author: {
  //   fontSize: 14,
  //   color: '#666',
  //   marginLeft: 5,
  // },
  // date: {
  //   fontSize: 14,
  //   color: '#666',
  //   marginLeft: 5,
  // },
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