const Device = require('../models/device');
const mongoose = require('mongoose');

const perf = require('performance-now');

exports.getDevices = (req, res, next) => {
    Device.find()
        .select({
            name: 1,
            model_type: 1,
            status: 1,
            creator: 1
        })
        .then(result => {
            if (result.length <= 0) {
                return res.status(200).json({
                    message: 'Устройств не обнаружено'
                });
            }
            res.status(200).json({
                message: result
            });
        });
};

exports.getDevice = (req, res, next) => {
    const {id} = req.params;
    Device.find({
        _id: id
    })
    .select({
        __v: 0
    })
    .then(result=>{
        if (result.length <= 0) {
            return res.status(404).json({
                message: 'Запрашиваемое устройство отсутсвует'
            });
        }
        return res.status(200).json({
            message: result
        });
    })


    console.log(req.params.id)

   
};


exports.getButtons = (req, res, next) => {
    Device.find({
            model_type: 'button'
        })
        .select({
            // name: 1,
            // model_type: 1,
            // status: 1,
            // creator: 1
        })
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({
                    message: 'Кнопачек отсутсвуют'
                });
            }
            return res.status(200).json({
                message: result
            });
        });
};

exports.getButton = (req, res, next) => {
    const {
        id
    } = req.body;
    Device.find({
            _id: id,
            model_type: 'button'
        })
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({
                    message: 'Кнопки с таким ID не сущесвтвует'
                });
            }
            res.status(200).json({
                message: result
            });

        })
        .catch(err => {
            if (!err.statusCode) {
                err.status = 500;
            }
            next(err);
        });
};

exports.postButton = (req, res, next) => {
    const userId = '5c9d11cecef45d06d4bd0c0f';
    const model_type = 'button';
    const {
        name,
        status,
        isOn
    } = req.body;
    const device = new Device({
        name: name,
        model_type: model_type,
        status: status,
        isOn: isOn,
        creator: userId
    });
    device.save()
        .then(result => {
            res.status(200).json({
                message: 'Кнопка успешно добавлена',
                device: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.putButton = (req, res, next) => {

    let start = perf();
    const {
        id,
        status,
        isOn,
        slavesId
    } = req.body;

    // let slaves = [];
    // for (let i = 0; i< slavesId.length; i++) {
    //     slaves[i] =mongoose.mongo.ObjectId(slavesId[i]);
    // }

    Device.findOneAndUpdate({
            _id: id,
            model_type: 'button'
        }, {
            isOn: isOn
        }, {
            new: true
        })
        .select({
            data_log: 0,
            creator: 0,
            createdAt: 0
        })
        .then(result => {
            Device.findOneAndUpdate({
                    _id: id,
                }, {
                    $push: {
                        data_log: result,
                    },
                    $addToSet: {
                        slaves: {
                            $each: slavesId
                        }
                    }

                }, {
                    new: true,
                    upsert: true
                })
                .select({
                    data_log: 0
                })
                .then(result => {
                    res.status(200).json(result);
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



};


exports.getActuators = (req, res, next) => {
    Device.find({
            model_type: 'actuator'
        })
        .select({
            name: 1,
            model_type: 1,
            status: 1,
            creator: 1
        })
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({
                    message: 'Испольнительных устройства отсутствуют'
                });
            }
            return res.status(200).json({
                message: result
            });
        });
};


exports.getSensors = (req, res, next) => {

    Device.find({
            model_type: 'sensor'
        })
        .select({
            name: 1,
            model_type: 1,
            status: 1,
            creator: 1
        })
        .then(result => {
            if (result.length <= 0) {
                return res.status(404).json({
                    message: 'Сенсоры отсуствуют'
                });
            }
            return res.status(200).json({
                message: result
            });
        });


};



// function getRandom(min, max) {
//     return Math.random() * (max - min) + min;
// }

// function virtualLightSensor(id) {
//     // let id = '5c9db27e16d77c54381f7c08';
//     Device.findOneAndUpdate({
//             _id: id,
//             status: true
//         }, {
//             adjustment: getRandom(400, 500)
//         })
//         .select({
//             data_log: 0,
//             createdAt: 0,
//             creator: 0,
//             _id: 0,
//             name: 0,
//             model_type: 0
//         })
//         .then(result => {
//             return Device.findOneAndUpdate({
//                     _id: id
//                 }, {
//                     $push: {
//                         data_log: result
//                     }
//                 })
//                 .then(() => console.log('Запись добавлена'))
//                 .catch(err => console.log(err));

//         });
// }

// function virtualActuatorCreate(data) {
//     const {
//         name,
//         model_type,
//         status
//     } = data;

//     const device = new Device({
//         name: name,
//         model_type: model_type,
//         status: status
//     });

//     device.save();

// }


// function virtualActuatorUpdate(id, data) {
//     const {
//         isOn,
//         status
//     } = data;
//     Device.findOne({
//         _id: id
//     }).then(result => {
//         console.log(result);
//     })





//     // Device.findOneAndUpdate({
//     //     _id: id,
//     //     status: true
//     // }, {})

// }



// setInterval(virtualLightSensor, 10000, '5c9db27e16d77c54381f7c08');
// setInterval(virtualLightSensor, 15000, '5c9db27f16d77c54381f7c09');


// res.status(200).json({
//     message: 'fghjkl'
// });