// src/screens/FeedScreen.tsx
import React, { useEffect, useCallback } from 'react'; // Импортируем useCallback
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import PostItem from '../components/PostItem';
import { observer } from 'mobx-react-lite';
import { feedStore } from '../store/FeedStore';
import { colors, spacing, typography } from '../styles/tokens';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type FeedScreenNavigationProp = NavigationProp<RootStackParamList, 'Feed'>;

// Оцениваем примерную высоту одного поста (может потребоваться точная настройка)
// Например, если заголовок ~24px + текст ~16*24px + отступы ~30px => ~70-80px
const ESTIMATED_POST_HEIGHT = 80;

const FeedScreen: React.FC = observer(() => {
  const navigation = useNavigation<FeedScreenNavigationProp>();

  useEffect(() => {
    if (feedStore.posts.length === 0) {
      feedStore.fetchPosts(1, false);
    }
  }, []);

  const handleReadPress = (postId: number, postTitle: string, postContent: string) => {
    navigation.navigate('PostDetail', {
      postId: String(postId),
      postTitle,
      postContent,
    });
  };

  const handleEndReached = useCallback(() => { // Оборачиваем в useCallback
    if (feedStore.hasMorePages && !feedStore.isLoading && !feedStore.isRefreshing) {
       feedStore.loadNextPage();
    }
  }, []); // Пустой массив зависимостей, т.к. feedStore неизменен

  const renderFooter = () => {
    if (feedStore.isLoading && !feedStore.isRefreshing) {
      return <ActivityIndicator size="small" color={colors.primary} style={styles.footerLoader} />;
    }
    return null;
  };

  const renderItem = useCallback(({ item }: { item: Post }) => ( // Оборачиваем в useCallback
    <PostItem
      title={item.title}
      onReadPress={() => handleReadPress(item.id, item.title, item.body)}
    />
  ), [handleReadPress]); // Зависимость: handleReadPress

  // Если есть ошибка и нет постов
  if (feedStore.error && feedStore.posts.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorBox}>
          <Text style={styles.errorTitle}>Ошибка загрузки</Text>
          <Text style={styles.errorMsg}>{feedStore.error}</Text>
          <Text style={styles.retryHint}>Потяните вниз, чтобы попытаться снова</Text>
        </View>
        <RefreshControl
          refreshing={feedStore.isRefreshing}
          onRefresh={feedStore.refreshFeed}
          tintColor={colors.primary}
        />
      </SafeAreaView>
    );
  }

  // Первая загрузка
  if (feedStore.isLoading && feedStore.posts.length === 0 && !feedStore.error) {
      return (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color={colors.primary} style={styles.centered} />
        </SafeAreaView>
      );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Лента Мецената</Text>
      </View>

      <FlatList
        data={feedStore.posts}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem} // Используем useCallback-обернутую функцию
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={feedStore.isRefreshing}
            onRefresh={feedStore.refreshFeed}
            tintColor={colors.primary}
          />
        }
        onEndReached={handleEndReached} // Используем useCallback-обернутую функцию
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        // --- Оптимизации FlatList ---
        initialNumToRender={10} // Отрисовываем сразу 10 элементов
        windowSize={21} // Оптимальное значение: 10 видимых + 5 сверху + 5 снизу = 20 + 1 (для индикатора)
        getItemLayout={
          // Если высота постов одинаковая, это сильно ускоряет прокрутку
          feedStore.posts.length > 0 ? (_, index) => ({
              length: ESTIMATED_POST_HEIGHT,
              offset: ESTIMATED_POST_HEIGHT * index,
              index,
          }) : undefined
        }
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { padding: spacing.medium, backgroundColor: '#fff', alignItems: 'center' },
  title: {
    fontSize: typography.title.fontSize,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContent: { padding: spacing.medium },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorBox: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.large },
  errorTitle: {
    fontSize: typography.errorTitle.fontSize,
    fontWeight: 'bold',
    color: colors.error,
    marginBottom: spacing.small,
  },
  errorMsg: {
    fontSize: typography.errorMsg.fontSize,
    color: colors.secondaryText,
    textAlign: 'center',
    marginBottom: spacing.small,
  },
  retryHint: {
    fontSize: typography.retryHint.fontSize,
    color: colors.hintText,
  },
  footerLoader: {
      paddingVertical: spacing.small,
      justifyContent: 'center',
      alignItems: 'center',
  }
});

export default FeedScreen;