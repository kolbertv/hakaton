const Hub = require('../models/hub');

exports.getHub = (req, res, next) => {

    Hub.find({
        })
        .select({
        })
        .then(result => {
            console.log(result)
            if (result.length <= 0) {
                return res.status(404).json({
                    message: 'Устройств не обнаружено'
                });
            }
            res.status(200).json({
                message: result
            });
        })
        .catch(err=>{
                        if (!err.statusCode) {
                err.statusCode = 500;
            }
            next();
        });
};

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
};

exports.putHub=(req, res, next)=>{
    const {
        id,
        name,
        description,
        temperature,
        voltage,
        amperage,
        location,
        creator,
        slaves
    } = req.body;

    Hub.findOneAndUpdate({
        _id: id
    }, {
        name: name,
        description: description,
        temperature: temperature,
        voltage: voltage,
        amperage: amperage,
    }, {
        new: true
    })
    .select({
        data_log: 0,
        creator: 0
    })
    .then(result=>{
        console.log(result);
        Hub.findOneAndUpdate({
            _id: id
        }, {
            $push: {data_log: result},
            $addToSet: {
                slaves: {
                    $each: slaves
                }
            }
        },{
            new:true
        })
        .select({
            data_log: 0
        })
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
    })
    .catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });
}