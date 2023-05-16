const router = require("express").Router();
const Job = require("../models/Job");

//create new job
router.post("/", async (req, res) => {
    const newJob = new Job(req.body);
    console.log(console.req)
    try {
        const savedJob = await newJob.save();
        res.status(200).json(savedJob);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete job
router.delete('/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        // Delete the job object from the database
        await job.deleteOne();
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//get all jobs of a company
router.get('/company/:companyId', async (req, res) => {


    try {

        const companyId = req.params.companyId;
        const jobs = await Job.find({ companyId });

        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//get all jobs from the hr creator
router.get('/hr/:HRCreatorId', async (req, res) => {
    try {
        const HRCreatorId = req.params.HRCreatorId;

        // Retrieve all jobs created by the HR manager
        const jobs = await Job.find({ HRCreatorId });

        res.status(200).json(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//get all job
router.get("/", async (req, res) => {
    try {
        const query = {};

        if (req.query.id) {
            query._id = req.query.id;
        }
        if (req.query.workplace) {
            query.workplace = req.query.workplace;
        }
        if (req.query.location) {
            query.location = req.query.location;
        }
        if (req.query.type) {
            query.type = req.query.type;
        }
        if (req.query.companyId) {
            query.companyId = req.query.companyId;
        }
        if (req.query.HRCreatorId) {
            query.HRCreatorId = req.query.HRCreatorId;
        }

        if (req.query.id) {
            const jobs = await Job.findById(req.query.id);
            res.status(200).json(jobs);
        }
        else {
            const jobs = await Job.find(query);
            res.status(200).json(jobs);
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
})

//get one job
router.get('/:id', async (req, res) => {
    try {
        const jobId = req.params.id;
        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.status(200).json(job);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// update job
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const job = await Job.findByIdAndUpdate(id, updates, { new: true });

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
router.put('/:id/applications', async (req, res) => {
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