const createComment = async (commentModel, data) => {
    try {
        const comment = await commentModel.create(data);
        return comment;
    } catch (error) {
        throw error;
    }
};

const getAllComments = async (commentModel) => {
    try {
        const comments = await commentModel.findAll();
        return comments;
    } catch (error) {
        throw error;
    }
};

const getCommentById = async (commentModel, commentId) => {
    try {
        const comment = await commentModel.findByPk(commentId);
        return comment;
    } catch (error) {
        throw error;
    }
};

const updateComment = async (commentModel, commentId, data) => {
    try {
        const updated = await commentModel.update(data, { where: { comment_id: commentId } });
        return updated;
    } catch (error) {
        throw error;
    }
};

const deleteComment = async (commentModel, commentId) => {
    try {
        const deleted = await commentModel.destroy({ where: { comment_id: commentId } });
        return deleted;
    } catch (error) {
        throw error;
    }
};

const getNestedCommentById = async (commentModel, parentCommentId) => {
    try {
        const comment = await commentModel.findAll({
            where: {parent_comment_id: parentCommentId}
        });
        return comment;
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
