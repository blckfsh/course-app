const mongoose = require("mongoose"); // importing mongoose

// Create a Schema
const RedeemSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    course_id: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    isRedeemed: {
        type: Boolean,
        default: false
    },
    isExpired: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date
    }
})

// export model
module.exports = mongoose.models.Redeem || mongoose.model('Redeem', RedeemSchema);