const { Comment } = require('../models')

const commentData = [
    {
        comment_content: "test test",
        blog_id: 2,
        user_id: 3,
    },
    {
        comment_content: "great post",
        blog_id: 1,
        user_id: 4,
    },
    {
        comment_content: "this homework is long",
        blog_id: 3,
        user_id: 1,
    },
    {
        comment_content: "Having a great time",
        blog_id: 4,
        user_id: 2,
    }
]

const seedCommentData = () => Comment.bulkCreate(commentData)

module.exports = seedCommentData;
