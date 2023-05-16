const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    },
    grade: {
        type: String,
        default: ""
    },
    status: {
        type: Number,
        enum: [1, 2, 3] //completed, ongoing, have enrolled
    }
});

const workExperienceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date
    },
    stillWorking: {
        type: Boolean,
    },
    description: {
        type: String,
        required: true
    }
});

const NameSchema = new mongoose.Schema({
    fname: {
        type: String,
    },
    lname: {
        type: String,
    }
})

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required:false,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    other_links: {
        type: Array,
        default: []
    },
    education: {
        type: [educationSchema]
    },
    work_experience: {
        type: [workExperienceSchema]
    },
    city: {
        type: String
    },
    skills: {
        type: [String]
    },
    resume_link: {
        type: String
    },
    profile_picture: {
        type: String
    }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;