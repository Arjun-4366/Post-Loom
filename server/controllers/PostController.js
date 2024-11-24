const Post = require("../models/PostSchema");

const createNewPost = async (req, res) => {
  try {
    const { title, description,userId } = req.body;
    console.log(req.body)
  
    const newPost = new Post({ title, description, image:req.file.filename ,userId:userId});
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

  const getAllPosts = async (req, res) => {
    try {
      const allPosts = await Post.find().populate(  
        'userId'
      )
      console.log("all post",allPosts)
      res.status(200).json(allPosts);
    
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }
  };

const updatePost = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("title",title)
    console.log("dec",description)  
    const image = req.file?.path;
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "post is not found" });
    }
    post.title = title || post.title;
    post.description = description || post.description;
    post.image = image || post.image;

    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ message: "post not found" });
    }
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted Successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createNewPost, updatePost, deletePost, getAllPosts };
