const router = require('express').Router();
const {getStudent, addStudent, submitTest}=require('../Controllers/StudentController');

router.post('/getstudent', getStudent);
router.post('/addstudent', addStudent);
router.post('/submittest', submitTest);

module.exports = router;