const mongoose = require("mongoose")

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    logoUrl: {
        type: String,
        required: true,
    },
    HRAdmin: {
        type: String,
        required: true,
    },
    HRs: {
        type: Array,
        default: []
    },
    jobs: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Company", CompanySchema)