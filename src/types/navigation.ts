// src/types/navigation.ts
export type RootStackParamList = {
  Feed: undefined;
  PostDetail: {
    postId: string;
    postTitle: string;
  };
};