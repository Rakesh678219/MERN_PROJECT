import Post from "../models/Post.js";
import User from "../models/User.js";
/*CREATE*/
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.params;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const allPosts = await Post.find();
    res.status(200).send(allPosts);
  } catch (error) {
    res.status(500).send(error);
  }
};

/*READ*/
export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    res.status(200).send(allPosts);
  } catch (error) {
    res.send(500).send(error);
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const postsofUser = await Post.find({ userId });
    res.send(postsofUser);
  } catch (error) {
    res.send(500).send(error);
  }
};

/*UPDATE*/
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        likes: post.likes,
      },
      { new: true }
    );
    res.send(updatedPost);
  } catch (error) {
    res.send(500).send(error);
  }
};
