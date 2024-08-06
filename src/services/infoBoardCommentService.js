const { Info_board_comment, Free_board_comment} = require('../models');

const createComment = async (data) => {
    try {
        const comment = await Info_board_comment.create(data);
        return comment;
    } catch (error) {
        throw error;
    }
};

const getAllComments = async () => {
    try {
        const comments = await Info_board_comment.findAll();
        return comments;
    } catch (error) {
        throw error;
    }
};

const getCommentById = async (commentId) => {
    try {
        const comment = await Info_board_comment.findByPk(commentId);
        return comment;
    } catch (error) {
        throw error;
    }
};

const getNestedCommentById = async (parentCommentId) => {
    try {
        const comment = await Free_board_comment.findAll({
            where: {parent_comment_id: parentCommentId}
        });
        return comment;
    } catch (error) {
        throw error;
    }
};

const updateComment = async (commentId, data) => {
    try {
        const updated = await Info_board_comment.update(data, { where: { comment_id: commentId } });
        return updated;
    } catch (error) {
        throw error;
    }
};

const deleteComment = async (commentId) => {
    try {
        const deleted = await Info_board_comment.destroy({ where: { comment_id: commentId } });
        return deleted;
    } catch (error) {
        throw error;
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
