const mongoose = require("mongoose"); // importing mongoose

// Create a Schema
const PrintSchema = mongoose.Schema({
    course_id: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    },    
})

// export model
module.exports = mongoose.models.Print || mongoose.model('Print', PrintSchema);