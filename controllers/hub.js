const Hub = require('../models/hub');

exports.getHub = (req, res, next) => {

    Hub.find({
        })
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({
                    message: 'Устройств не обнаружено'
                });
            }
            res.status(200).json({
                message: result
            });


        })
}

exports.postHub = (req, res, next) => {
    const {
        name,
        description,
        temperature,
        voltage,
        amperage,
        location,
        creator
    } = req.body;

    const hub = new Hub({
            name: name,
            description: description,
            temperature: temperature,
            voltage: voltage,
            amperage: amperage,
            location: location,
            creator: creator
        });
        hub.save()
        .then(result => {
            res.status(200).json({
                message: 'Хаб успешно создан',
                hub: result
            });
        })
        .catch(err=>{
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next();
        });
}