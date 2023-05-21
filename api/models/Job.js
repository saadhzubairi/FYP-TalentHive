const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    workplace: {
        type: String,
        default: "On-site"
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String,        
        default: "Full Time"
    },

    skills: {
        type: Array,
        default: []
    },
    description: {
        type: String,
        required: true,
    },
    requiremets: {
        type: String,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    HRCreatorId: {
        type: String,
        required: true,
    },
    spots: {
        type: Number,
        default: 1
    },
    applications: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Job", JobSchema)