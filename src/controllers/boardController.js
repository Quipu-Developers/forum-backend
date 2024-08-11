const boardService = require('../services/boardService');
const topService = require('../services/topFivePostService');

const createPost = async (boardModel, req, res) => {
    try {
        const post = await boardService.createPost(boardModel, req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPosts = async (boardModel, req, res) => {
    try {
        const posts = await boardService.getAllPosts(boardModel);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPostById = async (boardModel, req, res) => {
    try {
        const post = await boardService.getPostById(boardModel, req.params.id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePost = async (boardModel, req, res) => {
    try {
        const updated = await boardService.updatePost(boardModel, req.params.id, req.body);
        if (updated[0] === 1) {
            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deletePost = async (boardModel, req, res) => {
    try {
        const deleted = await boardService.deletePost(boardModel, req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const topFivePostsFromAll = async function showTopPostsFromAllBoards() {
    try {
        const topPosts = await topService.getTop5PostsFromAllBoards();

        console.log('Top 5 posts from all boards:', topPosts);
    } catch (error) {
        console.error('Error displaying top posts from all boards:', error);
    }
}

const topFivePostsFromEach = async function showTopPostsFromEachBoard() {
    try {
        const topPosts = await topService.getTop5PostsEachBoard();

        console.log('Top 5 posts from each board:', topPosts);
    } catch (error) {
        console.error('Error displaying top posts from each boards:', error);
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    topFivePostsFromAll,
};
