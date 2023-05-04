const mongoose = require("mongoose")

const JobApplicationSchema = new mongoose.Schema({
    candidateId: {
        type: String,
        required: true,
    },
    jobId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 1.0
    },
    status: {
        type: Number,
        enum: [1, 2],
        default: 1
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("JobApplication", JobApplicationSchema)