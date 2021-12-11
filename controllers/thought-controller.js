const { Thoughts, User } = require('../models');

const thoughtController = {
    // get all Thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    // get thought by id
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
            .select('-__v')
            .then(dbThoughtData => {
                // if no thoughts found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id! '});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Post new thought
    newThought({ params, body}, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true}
                )
            })
            .then(dbThoughtData => {
                // if no user found, send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found for this thought! '});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },

    // update thought by id
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.id},
            body,
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            // if no thought found, send 404
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    // delete thought by id
    deleteThought( { params }, res) {
        Thoughts.findOneAndDelete(
            { _id: params.id }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            User.findOneAndUpdate(
                { username: dbThoughtData.username },
                { $pull: { thoughts: params.id } }
            )
            .then(() => {
                res.json({ message: 'Thought deleted successfully' })
            })
            .catch(err => {
                res.status(400).json(err);
            })
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    // post reaction
    newReaction({ params, body}, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    },

    // delete reaction
    deleteReaction() {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: body.reactionId} } },
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            res.status(400).json(err);
        })
    }
}

module.exports = thoughtController;