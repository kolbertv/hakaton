const Hub = require('../models/hub');

exports.getIndex = (req, res, next)=>{

    Hub.find()
    .then(result=>{
        // console.log(result)
        res.render('admin', {
            pageTitle : result[0].name,
            slaves: result[0].slaves
        })
    });
};