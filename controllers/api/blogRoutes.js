const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuth = require('../../utils/auths');
const sequelize = require('../../config/connection')

//gets all posts
router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at',
            ],
            order: ['created_at', 'DESC'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'blog_id', 'user_id', 'create_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ],
        })
        res.status(200).json(blogData)
    }catch(err){
        res.status(500).json(err)
    }
})

//gets posts by id
router.get('/:id', async (req, res) => {
    try{
        const blogData = await Blog.findByPk({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'title',
                'content',
                'created_at',
            ],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'blog_id', 'user_id', 'create_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ],
        })
        if (!blogData){
            res.status(404).json({ message: 'There are no posts with this id' })
        }
        res.status(200).json(blogData)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try{
        const newBlogPost = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        })
        res.status(200).json(newBlogPost)
    }catch(err){
        res.status(500).json(err);
    }
});

//update blog post 
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        )
        if(!blogData){
            res.status(404).json({ message: "there is no post with this id " })
        }
        res.status(200).json(blogData)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete blog posts
router.delete('/:id', withAuth, async (req, res) => {
    try{
        const blogPostData = await Blog.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!blogPostData){
            res.status(404).json({ message: 'There are no posts wiht this id' })
            return;
        }
        res.status(200).json(blogPostData);
    }catch(err){
        res.status(500).json(err)
    }
});

module.exports = router;