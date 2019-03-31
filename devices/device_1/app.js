const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const iotRoutes = require('./routes/iot');



const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(iotRoutes);


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
}).then(result => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 1999);
}).catch(err => console.log(err));