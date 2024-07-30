const postService = require('../services/postService');

const createPost = async (req, res) => {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body);
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const success = await postService.deletePost(req.params.id);
        if (success) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: "Post not found" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createPost,
    getPostById,
    updatePost,
    deletePost,
    getAllPosts,
};