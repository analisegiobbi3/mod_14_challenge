const { Blog } = require('../models')

const blogData = [
    {
        title: "OOM",
        content: "This article is about the importance on monitoring OOM",
        user_id: 1
    },
    {
        title: "New Coders",
        content: "It's cool to be new to coding! You will learn so much",
        user_id: 2
    },
    {
        title: "Bootstrap",
        content: "Forget about struggling with CSS! Just use Bootstrap",
        user_id: 3
    },
    {
        title: "iOS 16",
        content: "Do we love it? Do we hate it? What is next for apple",
        user_id: 4
    }
]

const seedBlogData = () => Blog.bulkCreate(blogData);

module.exports = seedBlogData;
