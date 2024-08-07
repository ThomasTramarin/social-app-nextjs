export type Post = {
  post_id: string;
  author_id: string;
  creation_date: string;
  text: string;
  image_url: string;
  allow_comments: boolean;
  visibility: string;
  likes: number;
  comments: number;
  reposts: number;
};

export type UserProfileData = {
    data: {
      id: string;
      email: string;
      password: string;
      username: string;
      name: string;
      bio: string;
      avatar: string;
      posts: Post[];
    };
  }