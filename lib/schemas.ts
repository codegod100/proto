// nandi.schemas.post
export type Post = {
  title: string;
  content: string;
  author: string;
};

// nandi.schemas.comment
export type Comment = {
  content: string;
  author: string;
  post: Post;
};
