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
    modules: [
        {
            name: { type: String, required: true },
            desc: { type: String, required: true },
            path: { type: String, required: true }
        }
    ], 
    isActive: {
        type: Boolean,
        required: true
    }
})

// export model
module.exports = mongoose.models.Training || mongoose.model('Training', TrainingSchema);