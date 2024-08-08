export type Comment = {
  comment_id: string;
  author_id: string;
  author_name: string;   
  author_avatar: string;
  creation_date: string;
  text: string;
};


export type Post = {
  post_id: string;
  author_id: string;
  creation_date: string;
  text: string;
  image_url: string;
  allow_comments: boolean;
  visibility: string;
  likes: number;
  comments_count: number;
  reposts: number;
  userHasLiked: boolean;
  comments: Comment[]; 
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
};