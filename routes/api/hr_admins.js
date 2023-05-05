const express = require('express');
const router = express.Router();

// Load hr_admin model
const hr_admin = require('../../models/Hr_admin');

// @route GET api/hr_admin/test
// @description tests hr_admin route
// @access Public
router.get('/test', (req, res) => res.send('hr_admin route testing!'));

// @route GET api/hr_admin
// @description Get all hr_admin
// @access Public
router.get('/hr_admin', (req, res) => {
  hr_admin.find()
    .then((hr_admins) => res.json(hr_admins))
    .catch((err) => res.status(404).json({ nohr_adminsfound: 'No hr_admin found' }));
});

// @route GET api/hr_admins/:id
// @description Get single hr_admin by id
// @access Public
router.get('/hr_admin/:id', (req, res) => {
  hr_admin.findById(req.params.id)
    .then((hr_admin) => res.json(hr_admin))
    .catch((err) => res.status(404).json({ nohr_adminfound: 'No hr_admin found' }));
});

// @route GET api/hr_admins
// @description add/save hr_admin
// @access Public
router.post('/hr_admin', (req, res) => {
  hr_admin.create(req.body)
    .then((hr_admin) => res.json({ msg: 'hr_admin added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this hr_admin' }));
});

// @route GET api/hr_admins/:id
// @description Update hr_admin
// @access Public
router.put('/hr_admin/:id', (req, res) => {
  hr_admin.findByIdAndUpdate(req.params.id, req.body)
    .then((hr_admin) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/hr_admins/:id
// @description Delete hr_admin by id
// @access Public
router.delete('/hr_admin/:id', (req, res) => {
  hr_admin.findByIdAndRemove(req.params.id, req.body)
    .then((hr_admin) => res.json({ mgs: 'hr_admin entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a hr_admin fount !' }));
});

module.exports = router;