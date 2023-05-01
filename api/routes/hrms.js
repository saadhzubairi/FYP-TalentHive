const router = require("express").Router();
const HRM = require("../models/HRM");
const bcrypt = require("bcrypt")

//create a new HRM Admin
router.post('/admin', async (req, res) => {
    const { firstName, lastName, email, password, bio, companyId } = req.body;
    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create a new HRM document with the hashed password
    const newHRM = new HRM({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isAdmin:true,
        bio,
        companyId
    });

    try {
        // Save the new HRM document to the database
        const savedHRM = await newHRM.save();
        res.status(201).json(savedHRM);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//simple HRM
router.post('/', async (req, res) => {
    const { firstName, lastName, email, password, bio, companyId } = req.body;
    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new HRM document with the hashed password
    const newHRM = new HRM({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        bio,
        companyId
    });
    try {
        // Save the new HRM document to the database
        const savedHRM = await newHRM.save();
        res.status(201).json(savedHRM);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//update HRM:
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        firstName, lastName, email, password, bio, companyId, jobsCreated
    } = req.body;
    try {
        const hrm = await HRM.findByIdAndUpdate(id, {
            firstName, lastName, email, password, bio, companyId, jobsCreated
        }, { new: true });

        if (!hrm) {
            return res.status(404).json({ message: 'HR Manager not found' });
        }
        res.status(200).json(hrm);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

router.put('/:id/jobsCreated', async (req, res) => {
    try {
        const hrmId = req.params.id;
        const jobsCreated = req.body.jobsCreatedId;
        // Check if the hrm exists
        const hrm = await HRM.findById(hrmId);
        if (!hrm) {
            return res.status(404).json({ error: 'HR Manager not found' });
        }
        // Use a Set object to store unique application IDs
        const jobsCreatedSet = new Set(hrm.jobsCreated);
        jobsCreatedSet.add(jobsCreated);
        // Convert the Set back to an array
        hrm.applications = Array.from(applicationsSet);
        // Save the updated hrm object to the database
        const updatedHRM = await hrm.save();
        res.status(200).json(updatedHRM);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;