const express = require('express');
const router = express.Router();
const login_service = require('./login_service')
const comman_service = require('../common_service')
  

module.exports = router;

router.post('/user-login',login);


async function login(req,res,next){

    await login_service.authenticate(req.body)
    .then(list => list ? res.status(list.status).json({ status:list.status, result:list.list ,message:list.message}) : res.status(400).json({status: 400, message: "Username and Password not valid!.." }))
    .catch(err => next(err))
}
 
