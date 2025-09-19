let posts = []; // in-memory storage for now

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
  res.status(201).json(newPost);
};

export const getAllPosts = (req, res) => {
  res.json(posts);
};
