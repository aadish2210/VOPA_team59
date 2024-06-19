const { Signup, Login } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();

router.post('/signup', Signup);
router.post('/login', Login);
router.get('/', userVerification, (req, res) => {
  if (req.user) {
    res.status(200).json({ status: true, user: req.user.username });
  } else {
    res.status(401).json({ status: false });
  }
});

module.exports = router;
