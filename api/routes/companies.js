const router = require("express").Router();
const Company = require("../models/Company")

//CREATE a Company
router.post('/', async (req, res) => {
    const newCompany = new Company(req.body);
    try {
        const savedCompany = await newCompany.save();
        res.status(200).json(savedCompany);
    } catch (err) {
        res.status(500).json(err);
    }
});

//UPDATE Candidate:
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name, location, phone, email, website, industry, description, logoUrl, HRAdmin, HRs, jobs
    } = req.body;
    try {
        const company = await Company.findByIdAndUpdate(id, {
            name, location, phone, email, website, industry, description, logoUrl, HRAdmin, HRs, jobs
        }, { new: true });

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json(company);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//READ/GET/FETCH using queries:
router.get('/', async (req, res) => {
    try {
        const query = {};

        if (req.query.id) {
            query._id = req.query.id;
        }

        if (req.query.name) {
            query.name = req.query.name;
        }

        if (req.query.location) {
            query.location = req.query.location;
        }

        if (req.query.phone) {
            query.phone = req.query.phone;
        }

        if (req.query.email) {
            query.email = req.query.email;
        }

        if (req.query.website) {
            query.website = req.query.website;
        }

        if (req.query.industry) {
            query.industry = req.query.industry;
        }

        if (req.query.description) {
            query.description = req.query.description;
        }

        if (req.query.logoUrl) {
            query.logoUrl = req.query.logoUrl;
        }

        if (req.query.HRAdmin) {
            query.HRAdmin = req.query.HRAdmin;
        }

        if (req.query.id) {
            const company = await Company.findById(req.query.id);
            res.status(200).json(company);
        }
        else {
            const companies = await Company.find(query);
            res.status(200).json(companies);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCompany = await Company.findByIdAndDelete(id);
        if (!deletedCompany) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;