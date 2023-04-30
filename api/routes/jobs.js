const router = require("express").Router();
const Job = require("../models/Job");

//create new job
router.post("/", async (req, res) => {
    const newJob = new Job(req.body);
    try {
        const savedJob = await newJob.save();
        res.status(200).json(savedJob);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete job

//get job
router.get("/", async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})


//get all jobs

// update job
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        jobTitle,
        workplace,
        location,
        type,
        skills,
        description,
        requirements,
        companyId,
        HRCreatorId,
        applications
    } = req.body;

    try {
        const job = await Job.findByIdAndUpdate(id, {
            jobTitle,
            workplace,
            location,
            type,
            skills,
            description,
            requirements,
            companyId,
            HRCreatorId,
            applications
        }, { new: true });

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//adding new application
router.get('/:id/applications', async (req, res) => {
    try {
        const jobId = req.params.id;
        const applicationId = req.body.applicationId;

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Use a Set object to store unique application IDs
        const applicationsSet = new Set(job.applications);
        applicationsSet.add(applicationId);

        // Convert the Set back to an array
        job.applications = Array.from(applicationsSet);

        // Save the updated job object to the database
        const updatedJob = await job.save();

        res.status(200).json(updatedJob);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;