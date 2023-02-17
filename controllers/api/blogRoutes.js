const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auths');

router.post('/', withAuth, async (req, res) => {
    try{
        const newBlogPost = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newBlogPost)
    }catch(err){
        res.status(500).json(err);
    }
});

//come back to this route
router.put('/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.update(
            {
                user_id: req.body.user_id,
            },
            {
                where: {
                    id: req.params.id,
                },
            },
        )
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const blogPostData = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.params.user_id,
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