const mongoose = require("mongoose"); // importing mongoose

// Create a Schema
const CourseSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },     
    labs: [
        {
            name: { type: String, required: true },
            desc: { type: String, required: true },
            path: { type: String, required: true },
            date: { type: String, required: true }
        }
    ], 
    mods: [
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
module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema);