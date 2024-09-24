const express = require('express');
const authController = require('../controllers/authController'); // Ensure this import is correct
const verifyToken = require('../middleware/authMiddleware'); // Correct the import here
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/savePersonalInfo', verifyToken, authController.savePersonalInfo);

module.exports = router;
