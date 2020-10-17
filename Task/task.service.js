const client = require('../_helper/db')
var sha512 = require('js-sha512');
const common_service = require('../common_service');
const config = require('../config.json');

const jwt = require('jsonwebtoken');
const user_token = require('../_helper/user_token')
const _ = require('lodash');
const { template } = require('lodash');
module.exports = {
    add,
    update,
    deleteData,
    listData
   
}
async function listData(u_id){
    try{
        var user_task = await common_service.selectdata('tbl_task', '', '', '', 'u_id=' + u_id)
        if (user_task.length != 0 ) {
           
            var result_data = await common_service.success(200, "sucess",user_task)
            return result_data
        } else {
            const result_data = await common_service.error(400, "task found...",null)
            return result_data
        }
    }catch(e){
        const data = await common_service.error(400, "parameter is not valid!..")
        return data
    }
}
async function deleteData(taskid,u_id){
   
    if(taskid){
        var field = "" ;
            var column = '';
            var id =  taskid;
            var order = '';
            var select = await common_service.selectdata('tbl_task', column, id, order, field)
            if(select[0].u_id == u_id){
                var result = await common_service.delete_data('tbl_task', taskid)
                if(result){
                    var result_data = await common_service.success(200, "task delete sucess",null)
                    return result_data
                }else{
                    const result_data = await common_service.error(400, "task delete found...",null)
                    return result_data
                }
            }else{
                const result_data = await common_service.error(400, "task delete found...",null)
                    return result_data
            }

    }else{
        let result_data = await common_service.error(400, "insert user id...",null)
        return result_data

    }
}

async function add(userparam, email) {
    try{
    

        var data = [];
        if (email) {
            var field = "email ='" + email + "'";
            var column = '';
            var id = '';
            var order = '';
            var select = await common_service.selectdata('tbl_reg', column, id, order, field)
        
            if (select.length == 0) {
                const date = await common_service.error(400, "User not Found!..")
                return date
            } else {
                data['name'] = userparam.name;
                data['description'] = userparam.description;
                data['status'] = userparam.status
                data['priortiy'] = userparam.priortiy;
                data['reminder'] = userparam.reminder
                data['u_id'] = select[0].id
                var insert = await common_service.insert('tbl_task', data)
                
                if (insert) {
                    const data = await common_service.success(200, "your task is add successfully..", null)
                    return data
                } else {
                    return false
                }
            }
        
        }
    }catch(e){
        const data = await common_service.error(400, "parameter is not valid!..")
        return data
    }

}



async function update(userparam, id,u_id) {
// try{
    if (!id) {
        var result = common_service.error(400, "Id is not found")
        return result
    }  else {
        var field = 'first_name,last_name,user_token'
        var orderby = ''
        var data = await common_service.selectdata('tbl_reg', field, u_id, orderby)

        if (data.length == 1) {
                var update_array = []
               
                update_array['name'] = userparam.name;
                update_array['description'] = userparam.description;
                update_array['status'] = userparam.status
                update_array['priortiy'] = userparam.priortiy;
                update_array['reminder'] = userparam.reminder
               

                var result = await common_service.update_field('tbl_task', update_array, id)

                if(result){
                    var result_data = await common_service.success(200, "task update sucess",null)
                    return result_data
                }else{
                    var result_data = await common_service.error(400, "task update faild",null)
                    return result_data
                }
            } else {
                var result = common_service.error(400, "Invalid user token")
                return result
            }
        } 
    // }catch(e){
    //     const data = await common_service.error(400, "parameter is not valid!..")
    //     return data
    // }

    }

