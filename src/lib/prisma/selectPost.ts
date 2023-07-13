export const selectPost = (userId: string | undefined) => ({
  id: true,
  content: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      username: true,
      name: true,
      profilePhoto: true,
    },
  },
  visualMedia: {
    select: {
      type: true,
      url: true,
    },
  },
  /**
   * Use postLikes to store the <PostLike>'s id of the user to the Post.
   * If there is a <PostLike> id, that means the user requesting has
   * liked the Post.
   */
  postLikes: {
    select: {
      id: true,
    },
    where: {
      userId: userId,
    },
  },
  _count: {
    select: {
      postLikes: true,
      comments: true,
    },
  },
});
