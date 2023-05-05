const router = require("express").Router();
const User = require("../models/HRM")
const Candidate = require("../models/Candidate")
const bcrypt = require("bcrypt")

//Login:
router.post("/login/HRM", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("User not found.");

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        !validPassword && res.status(400).json("Wrong Password");

        res.status(200).json(user);

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