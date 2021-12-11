const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    newFriend,
    removeFriend
} = require('../../controllers/user-controller');

//set up routes to /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


//set up routes to /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

//set up routes to /api/users/:id/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(newFriend)
    .delete(removeFriend)

module.exports = router;
    