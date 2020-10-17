const express = require('express');
const app = express();
const db = require('./_helper/db')

const cors = require('cors');
const bodyParser = require('body-parser');
// const jwt = require('./_helper/jwt');
// app.use(jwt());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());
                                                                                                                                                  

app.use('/login',require('./Login/login_controller'));
app.use('/user',require('./Register/register.controller'))
app.use('/task',require('./Task/task.controller'))
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3100;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
