// src/components/PostItem.tsx
import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '../styles/tokens';

type PostItemProps = {
  title: string;
  onReadPress: () => void;
};

const PostItem: React.FC<PostItemProps> = ({ title, onReadPress }) => {
  return (
    <TouchableOpacity onPress={onReadPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.readMore}>Читать далее...</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: spacing.medium,
    marginBottom: spacing.medium,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18, // Используем подходящий размер для заголовка поста
    fontWeight: 'bold', // Явно указываем 'bold'
    color: colors.text,
    marginBottom: spacing.small,
  },
  readMore: {
    color: colors.primary,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

export default memo(PostItem);