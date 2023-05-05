const express = require('express');
const router = express.Router();

// Load Company model
const Company = require('../../models/Company');

// @route GET api/Company/test
// @description tests Company route
// @access Public
router.get('/test', (req, res) => res.send('Company route testing!'));

// @route GET api/Company
// @description Get all Company
// @access Public
router.get('/company', (req, res) => {
  Company.find()
    .then((Companys) => res.json(Companys))
    .catch((err) => res.status(404).json({ noCompanysfound: 'No Company found' }));
});

// @route GET api/Companys/:id
// @description Get single Company by id
// @access Public
router.get('/:id', (req, res) => {
  Company.findById(req.params.id)
    .then((Company) => res.json(Company))
    .catch((err) => res.status(404).json({ noCompanyfound: 'No Company found' }));
});

// @route GET api/Companys
// @description add/save Company
// @access Public
router.post('/company', (req, res) => {
  Company.create(req.body)
    .then((Company) => res.json({ msg: 'Company added successfully' }))
    .catch((err) => res.status(400).json({ error: 'Unable to add this Company' }));
});

// @route GET api/Companys/:id
// @description Update Company
// @access Public
router.put('/:id', (req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body)
    .then((Company) => res.json({ msg: 'Updated successfully' }))
    .catch((err) =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/Companys/:id
// @description Delete Company by id
// @access Public
router.delete('/:id', (req, res) => {
  Company.findByIdAndRemove(req.params.id, req.body)
    .then((Company) => res.json({ mgs: 'Company entry deleted successfully' }))
    .catch((err) => res.status(404).json({ error: 'No such a Company fount !' }));
});

module.exports = router;