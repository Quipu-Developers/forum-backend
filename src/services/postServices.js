const { Post } = require('../models');

const createPost = async (postData) => {
    try {
        const post = await Post.create(postData);
        return post;
    } catch (error) {
        throw new Error(error);
    }
};

const getPostById = async (postId) => {
    try {
        const post = await Post.findByPk(postId);
        return post;
    } catch (error) {
        throw new Error(error);
    }
};

const updatePost = async (postId, postData) => {
    try {
        await Post.update(postData, { where: { post_id: postId } });
        const updatedPost = await Post.findByPk(postId);
        return updatedPost;
    } catch (error) {
        throw new Error(error);
    }
};

const deletePost = async (postId) => {
    try {
        await Post.destroy({ where: { post_id: postId } });
        return true;
    } catch (error) {
        throw new Error(error);
    }
};

const getAllPosts = async () => {
    try {
        const posts = await Post.findAll();
        return posts;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getAllPosts,
};