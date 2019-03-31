const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    model_type: {
        type: String,
        required: true,
    },
    name_short: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: Boolean,
        required: true,
    },
    voltage: {
        type: Number
    },
    isOne: {
        type: Number
    },
    amperage: {
        type: Number
    },
    adjustment: {
        type: Number
    },
    location: {
        x: {
            type: Number
        },
        y: {
            type: Number
        },
        city: {
            type: String
        },
        country: {
            type: String
        }
    },
    params: Schema.Types.Mixed,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data_log: Schema.Types.Mixed,
    master: {
        type: Schema.Types.ObjectId,
        ref: 'Device'
    },
    slaves: [{
        type: Schema.Types.ObjectId,
        ref: 'Device'
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Device', deviceSchema);