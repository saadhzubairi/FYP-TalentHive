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
    message1: {
        type: String,
        default: ""
    },
    message2: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 1.0
    },
    status: {
        type: Number,
        enum: [1, 2, 3], //(1: not reviewed, 2:interview, 3:rejected)
        default: 1
    },
    interview: {
        type: String,
        default: ""
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("JobApplication", JobApplicationSchema)