const express = require('express');
const db = require('./postDb');

const router = express.Router();

router.get('/', (req, res) => {
    db.get()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.getById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ error: 'The user with the desired ID does not exist' })
            };
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(suc => {
            res.status(200).send(`You have successfully removed ${suc} post with the ID: ${id}`)
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const postObj = req.body;

    if (!postObj.text || !postObj.user_id) {
        res.status(400).json({ error: 'Please include some text with your request' })
    } else {
        db.update(id, postObj)
            .then(suc => {
                if (suc === 1) {
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

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;