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
        required: true
    },
    expiredOn: {
        type: Date,
        required: true
    }
})

// export model
module.exports = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);