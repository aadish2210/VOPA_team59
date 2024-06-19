const router = require('express').Router();
const { getSampleTest } = require('../Controllers/SampleTestsController');
const {addSampleTest}=require('../Controllers/SampleTestsController');

router.get('/get',getSampleTest);

router.post('/add', addSampleTest);

module.exports = router;