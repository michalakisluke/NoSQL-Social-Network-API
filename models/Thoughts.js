const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            // Creates new ID upon generation of reaction
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Please provide a reaction',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Please provide your username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (created) => dateFormat(created)
        }
    },
    {
        toJSON: {
            getters: true
        },
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'Please provide a thought',
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (created) => dateFormat(created)
        },
        username: {
            type: String,
            required: 'Please provide your username'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thought', ThoughtSchema);

module.exports = Thoughts;