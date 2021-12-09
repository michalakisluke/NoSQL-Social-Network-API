const { User, Thought } = require('../models');
const { findOneAndUpdate } = require('../models/Thoughts');

const userController = {
    // get all Users
    getAllUsers(req, res) {
        User.find({})
        .populate({
           path: 'thoughts',
           select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // get one User by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // if no pizza found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create User
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // update User by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    // delete User by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id! '});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    // add friend
    newFriend({ params }, res) {
    
    },

    // delete friend
    removeFriend( {params }, res) {

    }
};

module.exports = userController;