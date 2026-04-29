// src/store/FeedStore.ts
import { makeAutoObservable } from 'mobx';

type Post = {
  userId: number;
  id: number; // Важно, чтобы id был уникальным
  title: string;
  body: string;
};

const PAGE_SIZE = 10; // Определим размер страницы

class FeedStore {
  posts: Post[] = [];
  currentPage = 1;
  hasMorePages = true; // Изначально предполагаем, что страницы есть
  isLoading = false; // Флаг для индикатора загрузки при первой загрузке/пагинации
  isRefreshing = false; // Флаг для индикатора pull-to-refresh
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async fetchPosts(page: number = 1, isRefreshing = false) {
    // Если это обновление, устанавливаем флаг isRefreshing
    if (isRefreshing) {
      this.isRefreshing = true;
      this.error = null; // Сбрасываем ошибку при обновлении
    } else {
      // Если это первая загрузка или пагинация
      this.isLoading = true;
      this.error = null;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PAGE_SIZE}`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }
      const data: Post[] = await response.json();

      if (page === 1) {
        // При первой загрузке или обновлении, полностью заменяем посты
        this.posts = data;
      } else {
        // При пагинации добавляем новые посты
        this.posts = [...this.posts, ...data];
      }

      this.currentPage = page;
      // Если мы получили ровно PAGE_SIZE постов, значит, скорее всего, есть еще страницы.
      // Если получили меньше, это последняя страница.
      this.hasMorePages = data.length === PAGE_SIZE;

    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Unknown error';
      // При ошибке пагинации, нужно откатить currentPage, чтобы при следующей попытке он был прежним
      if (page > 1) {
        this.currentPage--;
      }
    } finally {
      // Всегда сбрасываем флаги загрузки
      this.isLoading = false;
      this.isRefreshing = false;
    }
  }

  loadNextPage = () => {
    // Вызываем загрузку следующей страницы только если:
    // 1. Еще есть страницы для загрузки (`hasMorePages`)
    // 2. Сейчас не идет активная загрузка (`!isLoading`)
    // 3. Сейчас не идет процесс обновления (`!isRefreshing`)
    if (this.hasMorePages && !this.isLoading && !this.isRefreshing) {
      console.log(`Attempting to load next page: ${this.currentPage + 1}`);
      this.fetchPosts(this.currentPage + 1);
    }
  };

  // Функция для pull-to-refresh
  refreshFeed = () => {
    this.fetchPosts(1, true); // Загружаем с первой страницы и устанавливаем флаг isRefreshing
  };

  // Сброс состояния (например, при выходе из экрана)
  reset() {
    this.posts = [];
    this.currentPage = 1;
    this.hasMorePages = true;
    this.error = null;
    this.isLoading = false;
    this.isRefreshing = false;
  }
}

export const feedStore = new FeedStore();