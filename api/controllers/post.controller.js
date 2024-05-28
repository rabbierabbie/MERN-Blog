import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();//Ideal method to save stuff to mongoose
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      //... is not an operator. (...arr) is not valid JavaScript. ... is only allowed inside array literals and in arguments lists, but those are special forms of the syntax (notice the ... in the production rules below).

      //The below mentioned properties are as defined on the posts model of our mongoDB account
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        //This is not spread operator but rest operator that allows us to use a way to represent variadic functions in js
        $or:
        //The $or operator performs a logical OR operation on an array of one or more <expressions> and selects the documents that satisfy at least one of the <expressions>. 
        //https://www.mongodb.com/docs/manual/reference/operator/query/or/
          [{ title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },//i represents the metcharacter in regex and defines insensitivity to case
          //https://www.mongodb.com/docs/manual/reference/operator/query/regex/ for regex function in mongodb
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })//read : https://mongoosejs.com/docs/api/query.html#Query.prototype.sort()
      .skip(startIndex)//Specifies the number of documents to skip.
      .limit(limit);//Specifies the maximum number of documents the query will return.

    const totalPosts = await Post.countDocuments();

    const now = new Date();
    const month=now.getMonth() - 1;
    const year=now.getFullYear();
    if(now.getMonth()===0){
      month=11;
      year=year-1;
    }
    const oneMonthAgo = new Date(
      year,
      month,//0 based numbering
      now.getDate()
    );
    //Lodash _.gte() method is used to check whether the specified value is greater than or equal to another or not.
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};


export const deletepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this post'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error);
  }
};

export const updatepost = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this post'));
  }
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};