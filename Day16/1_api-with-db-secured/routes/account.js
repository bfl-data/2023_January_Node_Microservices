const express = require('express');
const router = express.Router();

const accCtrl = require('../controllers/account-controller');

module.exports = function (passport) {
    router.get("/", function (req, res, next) {
        res.redirect('account/login');
    });

    router.get("/login", accCtrl.login_get);

    router.post("/login", accCtrl.login_post(passport));

    router.post("/getToken", accCtrl.createToken);

    return router;
};