const express = require('express');
const {
    body
} = require('express-validator/check');
const mongoose = require('mongoose');

const iotController = require('../controllers/iot');

const hubControllers = require('../controllers/hub');


const router = express.Router();

router.get('/hub', hubControllers.getHub);

router.post('/hub', hubControllers.postHub);

router.put('/hub', hubControllers.putHub);

router.get('/devices', iotController.getDevices);

router.get('/buttons', iotController.getButtons);

router.get('/button', iotController.getButton);

router.post('/button', iotController.postButton);

router.put('/button', iotController.putButton);

router.get('/actuators', iotController.getActuators);

router.get('/sensors', iotController.getSensors);


module.exports = router;