const router = require('express').Router();
const sequelize = require('../config/connection')
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auths')

router.get('/', withAuth, async (req, res) =>{
    try{
        const yourBlogData = await Blog.findAll(req.params.user_id, {
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
        const blog = yourBlogData.map((blog) => blog.get({ plain: true}));
        res.render('dashboard', {
            blog,
            logged_in: true
        });
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/edit/:id', withAuth, async (req, res) => {
    try{
        const yourBlogData = await Blog.findByPk(req.params.id, {
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
                    attributes: ['id', 'comment_content', 'blog_id', 'user_id','created_at'],
                    include: {
                        model: User,
                        attributes: ['username'],
                    }
                },
            ],
        });
        if (!yourBlogData){
            res.status(404).json({ message: 'There are no posts with this id' })
            return
        }
        const blog = yourBlogData.get({ plain: true });
        res.render('editpost', {
            blog,
            logged_in: true
        });

    }catch(err){
        res.status(500).json(err)
    }
});

router.get('/edituser', withAuth, async (req, res) => {
    try{
        const yourBlogData = await Blog.findByPk(res.params.user_id, {
            attributes: { exclude: ['password']}
        })
        if (!yourBlogData){
            res.status(404).json({ message: 'There are no posts with this id'})
            return;
        }
        const user = yourBlogData.get({ plain: true })
        res.render('edituser', {
            user,
            logged_in: true
        });
    }catch (err){
        res.status(500).json(err)
    }
})

router.get('/post/', withAuth, async (req, res) =>{
    try{
        const yourBlogData = await Blog.findAll({
            where: {
                user_id: req.session.user_id
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
        })
        const blogs = yourBlogData.map(blog => blog.get({ plain: true }))
        res.render('post', { blogs, logged_in: true })
    }catch(err){
        res.status(500).json(err)
    }
    
})

module.exports = router;