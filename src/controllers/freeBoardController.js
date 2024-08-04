const boardServices = require('../services/freeBoardService');

const createPost = async (req, res) => {
    try {
        const post = await boardServices.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await boardServices.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await boardServices.getPostById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const updated = await boardServices.updatePost(req.params.id, req.body);
        if (updated[0] === 1) {
            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const deleted = await boardServices.deletePost(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
