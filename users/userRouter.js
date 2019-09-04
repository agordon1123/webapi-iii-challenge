const express = require('express');
const db = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

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

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
