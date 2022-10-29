const mongoose = require("mongoose"); // importing mongoose

// Create a Schema
const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student'
    },
    status: {
        type: String,
        default: 'inactive'
    }
})

// export model
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);