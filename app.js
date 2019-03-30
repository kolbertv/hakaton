const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const iotRoutes = require('./routes/iot');


const app = express();

app.use((req, res, next) => {
     res.setHeader('Access-Control-Allow-Origin', '*');
     res.setHeader(
         'Access-Control-Allow-Methods',
         'OPTIONS, GET, POST, PUT, PATCH, DELETE'
     );
     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
     next();
 });

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(iotRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(result => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 1999);
}).catch(err => console.log(err));