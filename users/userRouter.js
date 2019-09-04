const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const name = req.body;
    // console.log(name);
    // if (!name) {
    //     res.status(400).json({ error: 'Please provide a name within the body of your request' });
    // } else {
        db.insert(name)
            .then(suc => {
                res.status(201).json(suc);
            })
            .catch(() => {
                res.status(500).json({ error: 'Internal server error' });
            })
    // };
});

router.post('/:id/posts', (req, res) => {
    const { id } = req.params;
    const text = req.body;
    console.log(id)

    // if (!text) {
    //     res.status(400).json({ error: 'Please provide text within the body of your request' });
    // } else {
    //     db.getById(id)
    //         .then(target => {
    //             target.insert(text)
    //                 .then(suc => {
    //                     res.status(201).json(suc);
    //                 })
    //                 .catch(() => {
    //                     req.status(500).json({ error: 'Internal server error' })
    //                 })
    //         })
    //         .catch(() => {
    //             res.status(500).json({ error: 'Internal server error' });
    //         });
    // };

});

router.get('/', (req, res) => {
    db.get()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.getById(id)
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
    db.getUserPosts(id)
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
    db.remove(id)
        .then(del => {
            res.status(200).send(`User with ID: ${id} was deleted along with all ${del} of their resources`);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.put('/:id', (req, res) => {

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
        res.status(400).json({ error: 'Please provide a name within the body of your request' });
        next();
    }
};

function validatePost(req, res, next) {

};

module.exports = router;
