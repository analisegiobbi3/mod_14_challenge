const router = require('express').Router();
const sequelize = require('../config/connection')
const { Blog, User, Comment } = require('../models');

//Finds all of the blog posts and renders them on the homepage 
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

//this route will find an individual post and render the post on its own page for commenting 
router.get('/blog/:id', async (req, res) => {
    try {
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

//login route redirects the user to the login page if they are not logged in. If they are logged in, goes to home page
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login')
})

//signup route redirects the user to the signup page if they are not logged in. If they are signed up in, goes to home page
router.get('/signup', (req, res) =>{
    if(req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('signup') 
})

module.exports = router;


