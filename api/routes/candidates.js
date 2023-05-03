//add candidate                         [DONE]
//edit canddidate                       [DONE]
//update candidate pwd              
//remove candidate                      
//get candidate (based on queries)  
//add,delete,update jobs
//add,delete,update educations
//add,delete,update skills

const router = require("express").Router();
const Candidate = require("../models/Candidate")
const bcrypt = require("bcrypt")

router.post('/', async (req, res) => {

    const { name, email, password, linkedin, phone_number, other_links, education, work_experience, city, skills, resume_link, profile_picture } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const candidate = new Candidate({
            name,
            email,
            password: hashedPassword,
            linkedin,
            phone_number,
            other_links,
            education,
            work_experience,
            city,
            skills,
            resume_link,
            profile_picture
        });

        await candidate.save();
        res.status(201).json(candidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to create candidate.', error: err });
    }
});

//UPDATE Candidate:
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedCandidate = await Candidate.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedCandidate) {
            return res.status(404).send({ error: 'Candidate not found' });
        }
        res.send(updatedCandidate);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }
});

//add job
router.post('/:id/jobs', (req, res) => {
    Candidate.findByIdAndUpdate(req.params.id,
        { $push: { work_experience: req.body } },
        { new: true }
    )
        .then((updatedCandidate) => res.json(updatedCandidate))
        .catch((err) => {
            return res.status(400).json({ error: err });
        });
});

//update job
router.put('/:id/jobs/:jobId', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ msg: 'Candidate not found' });
        }

        const workExpIndex = candidate.work_experience.findIndex(job => job.id === req.params.jobId);

        if (workExpIndex === -1) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        candidate.work_experience[workExpIndex] = { ...candidate.work_experience[workExpIndex], ...req.body };
        await candidate.save();
        res.json(candidate);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});


//delete job
router.delete('/:id/jobs/:jobId', (req, res) => {
    Candidate.findByIdAndUpdate(
        req.params.id,
        { $pull: { work_experience: { _id: req.params.jobId } } },
        { new: true }
    ).then((updatedCandidate) => {
        res.json(updatedCandidate);
    }).catch((e) => res.json({ error: e }));
});

module.exports = router;