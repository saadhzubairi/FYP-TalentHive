const router = require("express").Router();
const JobApplication = require("../models/JobApplication");

//resume -> aws -> fast api -> nlp -> fast api response
//PRE POST API

//create job application
router.post("/", async (req, res) => {
    const newJobApplication = new JobApplication(req.body);
    try {
        const savedJobApplication = await newJobApplication.save();
        res.status(200).json(savedJobApplication);
    } catch (err) {
        res.status(500).json(err);
    }
});
/* 
//read all:
router.get("/", (req, res) => {
    JobApplication.find()
        .then((jobApplications) => {
            res.status(200).json(jobApplications);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}); */

//read one by id:
router.get("/", async (req, res) => {
    const { candidateId, jobId, message, rating, status } = req.query;
    const filters = {};

    if (candidateId) {
        filters.candidateId = candidateId;
    }

    if (jobId) {
        filters.jobId = jobId;
    }

    if (message) {
        filters.message = message;
    }

    if (rating) {
        filters.rating = parseFloat(rating);
    }

    if (status) {
        filters.status = parseFloat(status);
    }

    try {
        const jobApplications = await JobApplication.find(filters);
        res.status(200).json(jobApplications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//EDIT JOB APP
router.put('/:id', async (req, res) => {
    try {
        const jobApp = await JobApplication.findByIdAndUpdate(
            req.params.id, // the job application ID to update
            req.body, // the updated job application data
            { new: true } // return the updated document
        );
        res.status(200).json(jobApp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

//read all by company:
/* router.get("/job/:id", (req, res) => {
    JobApplication.find({ jobId: req.params.id })
        .then((jobApplications) => {
            res.status(200).json(jobApplications);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}); */

//read all by candidate:
/* router.get("/candidate/:id", (req, res) => {
    JobApplication.find({ candidateId: req.params.id })
        .then((jobApplications) => {
            res.status(200).json(jobApplications);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
}); */

//to delete
router.delete('/applications/:id', async (req, res) => {
    try {
        const deletedApplication = await JobApplication.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ error: 'Job application not found' });
        }
        res.json({ message: 'Job application deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;