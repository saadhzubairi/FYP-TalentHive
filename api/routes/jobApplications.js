const router = require("express").Router();
const JobApplication = require("../models/JobApplication");

//create job
router.post("/", async (req, res) => {
    const newJobApplication = new JobApplication(req.body);
    try {
        const savedJobApplication = await newJobApplication.save();
        res.status(200).json(savedJobApplication);
    } catch (err) {
        res.status(500).json(err);
    }
});

//read all:
router.get("/", (req, res) => {
    JobApplication.find()
        .then((jobApplications) => {
            res.status(200).json(jobApplications);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

//read one by id:
router.get("/:id", (req, res) => {
    JobApplication.findById(req.params.id)
        .then((jobApplication) => {
            if (!jobApplication) {
                return res.status(404).json({ message: "Job application not found" });
            }
            res.status(200).json(jobApplication);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

//read all by company:
router.get("/job/:id", (req, res) => {
    JobApplication.find({ jobId: req.params.id })
        .then((jobApplications) => {
            res.status(200).json(jobApplications);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

//read all by candidate:
router.get("/candidate/:id", (req, res) => {
    JobApplication.find({ candidateId: req.params.id })
        .then((jobApplications) => {
            res.status(200).json(jobApplications);
        })
        .catch((err) => {
            res.status(500).json({ message: err.message });
        });
});

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