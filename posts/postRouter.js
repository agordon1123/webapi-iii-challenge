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

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;