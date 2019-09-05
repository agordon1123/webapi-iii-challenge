const express = require('express');
const usersdb = require('./userDb');
const postsdb = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const name = req.body;

    usersdb.insert(name)
        .then(suc => {
            res.status(201).json(suc);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

router.post('/:id/posts', (req, res) => {
    const { id } = req.params;
    const post = req.body;

    if (!post.text || !post.user_id) {
        res.status(400).json({ error: 'Please provide text within the body of your request' });
    } else {
        postsdb.insert(post)
            .then(suc => {
                res.status(201).send(suc);
            })
            .catch(() => {
                res.status(500).json({ error: 'Internal server error' });
            })
    };
});

router.get('/', (req, res) => {
    usersdb.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    usersdb.getById(id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ error: 'The user with the desired ID does not exist' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.get('/:id/posts', (req, res) => {
    const { id } = req.params;
    usersdb.getUserPosts(id)
        .then(posts => {
            if (posts) {
                res.status(200).json(posts);
            } else {
                res.status(404).json({ error: 'The user with the desired ID does not exist' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    usersdb.remove(id)
        .then(del => {
            res.status(200).send(`User with ID: ${id} was deleted along with all ${del} of their resources`);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const userObj = req.body;

    if (!userObj.name) {
        res.status(400).json({ error: 'Please include a name with your request' })
    } else {
        usersdb.update(id, userObj)
            .then(suc => {
                if(suc ===1) {
                    res.status(201).json(suc)
                } else {
                    res.status(500).json({ error: 'Internal server error' })
                }
            })
            .catch(() => {
                res.status(500).json({ error: 'Internal server error' })
            })
    }


});

//custom middleware

function validateUserId(req, res, next) {
    
    next();
};

function validateUser(req, res, next) {
    const name = req.body;
    if (!name) {
        res.status(400).json({ error: 'Please provide a name within the body of your request' });
    } else {
        next();
    }
};

function validatePost(req, res, next) {

};

module.exports = router;
