const express = require('express');
const router = express.Router();

const empCtrl = require('../controllers/employees-controller');
const { isAuthenticated } = require('../controllers/account-controller');

router.use(isAuthenticated);

router.get("/", empCtrl.index);

module.exports = router;