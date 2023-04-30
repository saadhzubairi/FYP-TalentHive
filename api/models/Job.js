const mongoose = require("mongoose")

const JobSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    workplace: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
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
    applications: {
        type: Array,
        default: []
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("Job", JobSchema)