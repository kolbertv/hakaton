const express = require('express');
const {
    body
} = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup',
    [
        body('email')
        .isEmail()
        .withMessage('Введите правильный емайл')
        .custom((value, {
            req
        }) => {
            return User.findOne({
                email: value
            }).then(result => {
                if (result) {
                    return Promise.reject('Пользователь с данным емайлом уже существует');
                }
            });
        })
        .normalizeEmail(),
        body('password', 'Пароль должен быть не короче 8 цифр и/или букв')
        .isLength({
            min: 8
        })
        .isAlphanumeric()
        .trim(),
        body('password_repeat')
        .custom((value, {
            req
        }) => {
            if (value !== req.body.password) {
                throw new Error('Введенные пароли не совпадают');
            }
            return true;
        })
        .trim()
    ],
    authController.signup
);

router.post('/login', authController.login);

module.exports = router;