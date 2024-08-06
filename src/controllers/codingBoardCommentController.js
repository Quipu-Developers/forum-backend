const codingBoardCommentService = require('../services/codingBoardCommentService');
const freeBoardCommentService = require("../services/freeBoardCommentService");

const createComment = async (req, res) => {
    try {
        const comment = await codingBoardCommentService.createComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await codingBoardCommentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCommentById = async (req, res) => {
    try {
        const comment = await codingBoardCommentService.getCommentById(req.params.id);
        if (comment) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const updated = await codingBoardCommentService.updateComment(req.params.id, req.body);
        if (updated[0] === 1) {
            res.status(200).json({ message: 'Comment updated successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const deleted = await codingBoardCommentService.deleteComment(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Comment deleted successfully' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNestedCommentById = async (req, res) => {
    try {
        const nestedComments = await codingBoardCommentService.getNestedCommentById(req.params.parentCommentId);
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
