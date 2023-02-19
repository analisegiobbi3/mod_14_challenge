const router = require('express').Router();
const { Comment } = require('../../models')
const withAuth = require('../../utils/auths')

router.get('/', async (req, res) =>{
    try{
        const commentData = await Comment.findAll()
        res.status(200).json(commentData)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/', withAuth, async (req, res) => {
    try{
        if (req.session){
            const commentData = await Comment.create({
                comment_content: req.body.comment_content,
                blog_id: req.params.blog_id,
                user_id: req.params.user_id,
            })
            res.status(200).json(commentData)
        }
    }catch(err){
        res.status(500).json(err)
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!commentData){
            res.status(404).json({ message: 'there are no comments with this id' })
        }
        res.status(200).json(commentData)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;
