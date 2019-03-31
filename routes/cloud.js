const express = require('express');

const router = express.Router();

const cloudController = require('../controllers/cloud');


router.get('/', cloudController.getIndex);




module.exports = router;