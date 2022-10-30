const mongoose = require("mongoose"); // importing mongoose

// Create a Schema
const CodeSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

// export model
module.exports = mongoose.models.Code || mongoose.model('Code', CodeSchema);