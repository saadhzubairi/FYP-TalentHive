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
        isAdmin: true,
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

//create a new simple HRM
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
        firstName, lastName, email, bio, companyId, jobsCreated, pfpURL, LinkedInProfile
    } = req.body;
    try {
        const hrm = await HRM.findByIdAndUpdate(id, {
            firstName, lastName, email, bio, companyId, jobsCreated, pfpURL, LinkedInProfile
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

//delete
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedHRM = await HRM.findByIdAndDelete(id);
        if (!deletedHRM) {
            return res.status(404).send({ error: 'HRM not found' });
        }
        res.send(deletedHRM);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server error' });
    }
});

//change password
router.put("/:id/update-password", async (req, res) => {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    try {
        // Find the HRM by ID
        const hrm = await HRM.findById(id);
        // Check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, hrm.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Encrypt the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        // Update the password and save the HRM
        hrm.password = hashedPassword;
        await hrm.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
});

//add a new job in the jobs created array
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
        hrm.jobsCreated = Array.from(jobsCreatedSet);
        // Save the updated hrm object to the database
        const updatedHRM = await hrm.save();
        res.status(200).json(updatedHRM);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

//get with querry for company and isAdmin
router.get("/", async (req, res) => {
    try {
        const { firstName, lastName, email, bio, companyId, jobsCreated, pfpURL, LinkedInProfile, isAdmin } = req.query;
        let query = {};

        if (firstName) {
            query.firstName = { $regex: new RegExp(firstName, "i") };
        }

        if (lastName) {
            query.lastName = { $regex: new RegExp(lastName, "i") };
        }

        if (email) {
            query.email = { $regex: new RegExp(email, "i") };
        }

        if (bio) {
            query.bio = { $regex: new RegExp(bio, "i") };
        }

        if (companyId) {
            query.companyId = companyId;
        }

        if (jobsCreated) {
            query.jobsCreated = jobsCreated;
        }

        if (LinkedInProfile) {
            query.LinkedInProfile = LinkedInProfile;
        }

        if (isAdmin) {
            query.isAdmin = isAdmin;
        }

        const hrms = await HRM.find(query);
        res.status(200).json(hrms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const hrmId = req.params.id;
        const hrm = await HRM.findById(hrmId);
        if (!hrm) {
            return res.status(404).json({ error: 'HR Manager not found' });
        }
        res.status(200).json(hrm);
    } catch(err) {
        res.status(500).json({error:err})
    }
});
module.exports = router;