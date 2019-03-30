const express = require('express');
const {
    body
} = require('express-validator/check');
const mongoose = require('mongoose');

const iotController = require('../controllers/iot');


const router = express.Router();

router.get('/devices', iotController.getDevices);

router.get('/buttons', iotController.getButtons);

router.get('/button', iotController.getButton);

router.post('/button', iotController.postButton);

router.put('/button', iotController.putButton);

router.get('/actuators', iotController.getActuators);

router.get('/sensors', iotController.getSensors);


module.exports = router;