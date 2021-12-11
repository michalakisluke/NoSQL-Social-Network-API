const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    newThought,
    updateThought,
    deleteThought,
    newReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//set up routes to /api/thoughts
router
    .route('/')
    .get(getAllThoughts)

// Set up route to post individual thoughts
router
    .route('/:userId')
    .post(newThought)

//set up routes to /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

//set up routes to /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(newReaction)
    .delete(deleteReaction)

module.exports = router;