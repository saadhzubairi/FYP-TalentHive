const mongoose = require("mongoose")

const HRMSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    lastName: {
        type: String,
        required: true,
        min: 3,
        max: 30,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    bio: {
        type: String,
        default: "",
    },
    pfpURL: {
        type: String,
        default: "",
    },
    companyId: {
        type: String,
        required: true,
    },
    jobsCreated: {
        type: Array,
        default: [],
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("HRM", HRMSchema)