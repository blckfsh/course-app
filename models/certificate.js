const mongoose = require("mongoose"); // importing mongoose

// Create a Schema
const CertificateSchema = mongoose.Schema({
    course_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cert_title: {
        type: String,
        required: true
    },
    awardedOn: {
        type: Date,
        default: Date.now()
    },
    expiredOn: {
        type: Date,
        default: Date.now()
    },
    status: {
        type: String,
        default: "PENDING"
    }
})

// export model
module.exports = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);