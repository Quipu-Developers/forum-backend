const { Coding_board } = require('../models');

const createPost = async (data) => {
    try {
        const post = await Coding_board.create(data);
        return post;
    } catch (error) {
        throw error;
    }
};

const getAllPosts = async () => {
    try {
        const posts = await Coding_board.findAll();
        return posts;
    } catch (error) {
        throw error;
    }
};

const getPostById = async (postId) => {
    try {
        const post = await Coding_board.findByPk(postId);
        return post;
    } catch (error) {
        throw error;
    }
};

const updatePost = async (postId, data) => {
    try {
        const updated = await Coding_board.update(data, { where: { post_id: postId } });
        return updated;
    } catch (error) {
        throw error;
    }
};

const deletePost = async (postId) => {
    try {
        const deleted = await Coding_board.destroy({ where: { post_id: postId } });
        return deleted;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
