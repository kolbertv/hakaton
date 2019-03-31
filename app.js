const path = require('path');

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const iotRoutes = require('./routes/iot');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const cloudRoutes = require('./routes/cloud');


const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader(
//         'Access-Control-Allow-Methods',
//         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
//     );
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');
//     next();
// });


app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(authRoutes);

app.use(adminRoutes)
app.use(cloudRoutes);
app.use(iotRoutes);

app.use((error, req, res, next) => {
    console.log('консольлог в app.js: ' + error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        message: message,
        data: data
    });
});


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(result => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 1999);
}).catch(err => console.log(err));


// document.getElementById().innerHTML('').innerHTML('')