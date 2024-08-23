const createPost = async (BoardModel, data) => {
    try {
        const post = await BoardModel.create(data);
        return post;
    } catch (error) {
        throw error;
    }
};

const getAllPosts = async (BoardModel) => {
    try {
        const posts = await BoardModel.findAll();
        return posts;
    } catch (error) {
        throw error;
    }
};

const getPostById = async (BoardModel, postId) => {
    try {
        const post = await BoardModel.findByPk(postId);
        return post;
    } catch (error) {
        throw error;
    }
};

const updatePost = async (BoardModel, postId, data) => {
    try {
        const updated = await BoardModel.update(data, { where: { post_id: postId } });
        return updated;
    } catch (error) {
        throw error;
    }
};

const deletePost = async (BoardModel, postId) => {
    try {
        const deleted = await BoardModel.destroy({ where: { post_id: postId } });
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
