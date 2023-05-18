const router = require("express").Router();
const HRM = require("../models/HRM")
const Candidate = require("../models/Candidate")
const bcrypt = require("bcrypt")

//Login:
router.post("/login", async (req, res) => {
    try {
        const user = await HRM.findOne({ email: req.body.email });
        const cuser = await Candidate.findOne({ email: req.body.email });
        !user && !cuser && res.status(404).json("User not found.");

        if (user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            !validPassword && res.status(400).json("Wrong Password");
        }
        else {
            const cValidPassword = await bcrypt.compare(req.body.password, cuser.password)
            !cValidPassword && res.status(400).json("Wrong Password");
        }

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(200).json(cuser);
        }

    } catch (error) {
        console.log(error);
    }
})

router.post("/login/Candidate", async (req, res) => {
    try {
        const user = await Candidate.findOne({ email: req.body.email });
        !user && res.status(404).json("User not found.");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password");

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
})

module.exports = router