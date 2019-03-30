const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hubSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'IoT хаб'
    },
    model_type: {
        type: String,
        required: true,
        default: 'hub'
    },
    description: {
        type:String
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    temperature: {
        type: Number,
    },
    voltage: {
        type: Number,
    },
    amperage: {
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
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    data_log: {
        type: Array
    },
    master: {
        type: Schema.Types.ObjectId,
        ref: 'Hub'
    },
    slaves: [{
        type: Schema.Types.ObjectId,
        ref: 'Hub'
    }]
});

module.exports = mongoose.model('Hub', hubSchema);