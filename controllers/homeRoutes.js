const router = require('express').Router();
const { route } = require('.');
const { Blog, User } = require('../models');
const withAuth = require('../utils/auths')

router.get('/', async (req, res) => {
    try{
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true}));
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
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/home', withAuth, async (req, res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });
        const user = userData.get({ plain: true });
        res.render('home', {
            ...user,
            logged_in: true
        });
    }catch(err){
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/home');
        return;
    }
    res.render('login')
})

module.exports = router;


