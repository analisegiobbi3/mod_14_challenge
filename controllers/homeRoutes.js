const router = require('express').Router();
const sequelize = require('../config/connection')
const { Blog, User, Comment } = require('../models');

router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at',
            ],
            // order: ['created_at', 'DESC'],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'blog_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    }catch(err){
        res.status(500).json(err)
    }
});

router.get('/blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
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
                    attributes: ['id', 'comment_content', 'blog_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ],
        });
        if (!blogData){
            res.status(404).json({ message: 'There are no blog posts with this id' })
        }
        const blog = blogData.get({ plain: true });

        res.render('comment', {
            blog,
            logged_in: req.session.logged_in
        });
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login')
})

router.get('/signup', (req, res) =>{
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup') 
})

module.exports = router;


