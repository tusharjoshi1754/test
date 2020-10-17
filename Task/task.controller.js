const express = require('express');
const router = express.Router();
const client = require('../_helper/db')
const task_service = require('./task.service')
const comman_service = require('../common_service');


module.exports = router;

router.post('/add',add);
router.put('/update',update)
router.delete("/delete/:id", delete_task)
router.get('/listing',list_task)

async function add(req,res,next){
    
 
    if(req.headers.user_token != null){
        let data =await comman_service.email_find(req.headers.user_token)
        console.log("data",data)
        if(data){
          
                await task_service.add(req.body,data[0].email)
                .then(list => list ? res.status(list.status).json({ status:list.status, result:list.list ,message:list.message}) : res.status(400).json({status: 400, message: "User not Found!.." }))
                .catch(err => next(err))
            
        }else{
            res.status(400).json({status: 400, message: "Invalid token!.." })
        }
        
    }else{
        res.status(400).json({status: 400, message: "Invalid token!.." })
        
    }
   
}
async function delete_task(req,res,next){
    
        if(req.headers.user_token != null){
            let data =await comman_service.email_find(req.headers.user_token)
    
            if(data){
                await task_service.deleteData(req.params.id,data[0].id)
                .then(list => list ? res.status(list.status).json({ status:list.status, result:list.list ,message:list.message}) : res.status(400).json({ message: 'false' }))
                .catch(err => next(err))            }
            else{
                res.status(400).json({status: 400, message: "Invalid token!.." })
        
            }
        }
      


}
async function list_task(req,res,next){
    
    if(req.headers.user_token != null){
        let data =await comman_service.email_find(req.headers.user_token)

        if(data){
            await task_service.listData(data[0].id)
            .then(list => list ? res.status(list.status).json({ status:list.status, result:list.list ,message:list.message}) : res.status(400).json({ message: 'false' }))
            .catch(err => next(err))            }
        else{
            res.status(400).json({status: 400, message: "Invalid token!.." })
    
        }
    }
  


}

async function update(req,res,next){
    
    if(req.body.id != null){
        if(req.headers.user_token != null){
            let data =await comman_service.email_find(req.headers.user_token)
            if(data){
                await task_service.update(req.body , req.body.id,data[0].id)
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
