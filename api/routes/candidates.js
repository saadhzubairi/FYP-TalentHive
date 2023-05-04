//add candidate                         [DONE]
//edit canddidate                       [DONE]
//update candidate pwd                  [DONE]
//remove candidate                      [DONE]
//get candidate (based on queries)      [DONE]
//add,delete,update jobs                [DONE]
//add,delete,update educations          [DONE]
//add,delete,update skills              [DONE]

const router = require("express").Router();
const Candidate = require("../models/Candidate")
const bcrypt = require("bcrypt")

//CREATE a candidate
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

//UPDATE candidate password:
router.put("/:id/update-password", async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
        // Find the Candidate by ID
        const candidate = await Candidate.findById(id);
        // Check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, candidate.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Encrypt the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Update the password and save the Candidate
        candidate.password = hashedPassword;
        await candidate.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

//READ/GET/FETCH using queries:
router.get('/', async (req, res) => {
    try {
        const query = {};

        if (req.query.id) {
            query._id = req.query.id;
        }

        if (req.query.fname) {
            query['name.fname'] = req.query.fname;
        }

        if (req.query.lname) {
            query['name.lname'] = req.query.lname;
        }

        if (req.query.email) {
            query.email = req.query.email;
        }

        if (req.query.linkedin) {
            query.linkedin = req.query.linkedin;
        }

        if (req.query.phone_number) {
            query.phone_number = req.query.phone_number;
        }

        if (req.query.city) {
            query.city = req.query.city;
        }

        if (req.query.skills) {
            query.skills = { $all: req.query.skills.split(',') };
        }

        const candidates = await Candidate.find(query);
        res.status(200).json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//DELETE CANDIDATE
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCandidate = await Candidate.findByIdAndDelete(id);
        if (!deletedCandidate) {
            return res.status(404).send({ error: 'Candidate not found' });
        }
        res.send(deletedCandidate);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }
});

//FOR JOB EXPERIENCES:
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
        candidate.work_experience[workExpIndex] = Object.assign(candidate.work_experience[workExpIndex], req.body)/* { ..., ... } */;
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

//FOR EDUCATIONAL EXPERIENCES
//add edu
router.post('/:id/edus', (req, res) => {
    Candidate.findByIdAndUpdate(req.params.id,
        { $push: { education: req.body } },
        { new: true }
    )
        .then((updatedCandidate) => res.json(updatedCandidate))
        .catch((err) => {
            return res.status(400).json({ error: err });
        });
});
//update edu
router.put('/:id/edus/:eduId', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        const eduIndex = candidate.education.findIndex(edu => edu.id === req.params.eduId);
        if (eduIndex === -1) {
            return res.status(404).json({ error: 'Education not found' });
        }
        candidate.education[eduIndex] = Object.assign(candidate.education[eduIndex], req.body);
        await candidate.save();
        res.json(candidate);
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err);
    }
});
//delete edu
router.delete('/:id/edus/:eduId', (req, res) => {
    Candidate.findByIdAndUpdate(
        req.params.id,
        { $pull: { education: { _id: req.params.eduId } } },
        { new: true }
    ).then((updatedCandidate) => {
        res.json(updatedCandidate);
    }).catch((e) => res.json({ error: e }));
});

//FOR SKILLS
//add Skill
router.post('/:id/skills', async (req, res) => {
    try {
        const canId = req.params.id;
        const skills = req.body.skill;
        // Check if the candidate exists
        const candidate = await Candidate.findById(canId);
        if (!candidate) {
            return res.status(404).json({ error: 'HR Manager not found' });
        }
        // Use a Set object to store unique skills
        const skillsSet = new Set(candidate.skills);
        skillsSet.add(skills);
        // Convert the Set back to an array
        candidate.skills = Array.from(skillsSet);
        // Save the updated candidate object to the database
        const updatedCandidate = await candidate.save();
        res.status(200).json(updatedCandidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//delete edu
router.delete('/:id/skills/:skill', async (req, res) => {
    try {
        const candidate = await Candidate.findById(req.params.id);
        if (!candidate) {
            return res.status(404).send({ message: 'Candidate not found' });
        }
        const skillToDelete = req.params.skill;
        candidate.skills = candidate.skills.filter((skill) => skill !== skillToDelete);
        await candidate.save();
        return res.send({ message: 'Skill deleted successfully', data: candidate });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

module.exports = router;