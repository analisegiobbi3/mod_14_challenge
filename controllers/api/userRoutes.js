const router = require('express').Router();
const { User, Blog, Comment } = require('../../models');
const session = require('express-session')
const withAuth = require('../../utils/auths')
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//gets all user data
router.get('/', async (req, res) => {
    try{
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        })
        res.status(200).json(userData)
    }catch(err){
        res.status(500).json(err)
    }
});

//gets user data by id
router.get('/:id', async (req, res) =>{
    try{
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Blog,
                    attributes: ['id', 'title', 'content', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_content', 'created_at'],
                    include: {
                        model: Blog,
                        attributes: ['title'],
                    }
                },
            ],
        })
        if (!userData){
            res.status(404).json({ message: 'no users with this id' })
        }
        res.status(200).json(userData)
    }catch(err){
        res.status(500).json(err)
    }
})

//creates a new user
router.post('/', async (req, res) =>{
    try {
        const userData = await User.create({
            username: req.body.username,
            password: req.body.password
        })
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;

            res.status(200).json(userData)
        })
    }catch(err){
        res.status(500).json(err)
    }
});

//finds the user you are trying to log in with

router.post('/login', async (req, res) => {
    try{
        const userData = await User.findOne({ where: { username: req.body.username }});

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password, please try again.'})
            return
        }

        const validPassword = userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password, please try again.'})
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged into the blog'});
        })
    }catch(err){
        res.status(500).json(err);
    }
});

//updates user login status
router.put('/:id', withAuth, async (req, res) =>{
    try{
        const userData = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id,
            }
        })
        if(!userData){
            res.status(404).json({ message: "A user with this id does not exist" })
        }
        res.status(200).json(userData)
    }catch(err){
        res.status(500).json(err)
    }
})

//delete user 
router.delete('/:id', withAuth, async (req, res) =>{
    try{
        const userData = await User.destroy({
            where: {
                id: req.params.id

            }
        })
        if(!userData){
            res.status(404).json({ message: "A user with this id does not exist" })
        }
        res.status(200).json(userData)
    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/logout', (req, res) =>{
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        })
    }else{
        res.status(404).end();
    }
});

module.exports = router;