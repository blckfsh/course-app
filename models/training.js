const mongoose = require("mongoose"); // importing mongoose

// Create a Schema
const TrainingSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contents: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        dest: {
            type: String,
            required: true
        }
    }],
    status: {
        type: Boolean,
        default: false
    }
})

// export model
module.exports = mongoose.models.Training || mongoose.model('Training', TrainingSchema);