let posts = []; // temporary in-memory storage

// Create Post
export const createPost = (req, res) => {
  const { title, content, tags, image } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    tags: tags || [],
    image: image || null,
    authorId: req.user.id, // from JWT
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  posts.push(newPost);
  return res.status(201).json(newPost);
};

// Fetch all posts (feed)
export const getAllPosts = (req, res) => {
  res.json(posts);
};

// Fetch single post by ID
export const getPostById = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

// Update Post (only owner)
export const updatePost = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);
  if (!post) return res.status(404).json({ message: "Post not found" });

  if (post.authorId !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to edit this post" });
  }

  const { title, content, tags, image } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  if (tags) post.tags = tags;
  if (image) post.image = image;
  post.updatedAt = new Date().toISOString();

  res.json(post);
};

// Delete Post (only owner)
export const deletePost = (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return res.status(404).json({ message: "Post not found" });

  if (posts[index].authorId !== req.user.id) {
    return res.status(403).json({ message: "Not authorized to delete this post" });
  }

  posts.splice(index, 1);
  res.json({ message: "Post deleted successfully" });
};
