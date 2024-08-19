const boardCommentService = require('../services/boardCommentService');

const createComment = async (commentModel, req, res) => {
    try {
        const comment = await boardCommentService.createComment(commentModel, req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllComments = async (commentModel, req, res) => {
    try {
        const comments = await boardCommentService.getAllComments(commentModel);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCommentById = async (commentModel, req, res) => {
    try {
        const comment = await boardCommentService.getCommentById(commentModel, req.params.id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateComment = async (commentModel, req, res) => {
    try {
        const updated = await boardCommentService.updateComment(commentModel, req.params.id, req.body);
        if (updated[0] === 1) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (commentModel, req, res) => {
    try {
        const deleted = await boardCommentService.deleteComment(commentModel, req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNestedCommentById = async (commentModel, req, res) => {
    try {
        const nestedComments = await boardCommentService.getNestedCommentById(commentModel, req.params.parentCommentId);
        res.status(200).json(nestedComments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment,
    getNestedCommentById
};
