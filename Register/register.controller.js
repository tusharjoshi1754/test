const express = require('express');
const router = express.Router();
const client = require('../_helper/db')
const register_service = require('./register.service')
const comman_service = require('../common_service');


module.exports = router;

router.post('/register',add);
router.put('/update_register',update)
router.delete("/delete/:id", delete_user)


async function add(req,res,next){
    
       var data=JSON.stringify(req.body)
    await register_service.add(data)
    .then(list => list ? res.status(list.status).json({ status:list.status, result:list.list ,message:list.message}) : res.status(400).json({ message: 'false' }))
    .catch(err => next(err))
}
async function delete_user(req,res,next){
    await register_service.deleteData(req.params)
    .then(list => list ? res.status(list.status).json({ status:list.status, result:list.list ,message:list.message}) : res.status(400).json({ message: 'false' }))
    .catch(err => next(err)) 
}

async function update(req,res,next){
    
    if(req.body.id != null){
        if(req.headers.user_token != null){
            let data =await comman_service.email_find(req.headers.user_token)
            if(data){
                await register_service.update(req.body , req.body.id)
                .then(list => list ? res.status(list.status).json({ status: list.status, message:list.message,result:list.list }) : res.status(400).json({ message: 'false' }))
            }
            else{
                res.status(400).json({status: 400, message: "Invalid token!.." })
        
            }
        }
        else{
            res.status(400).json({status: 400, message: "Invalid token!.." })
    
        }
    }
   
}
