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
    deleteData
   
}

async function deleteData(userparams){
    if(userparams.id){
        let field = ''
        let id = ''
        let orderby = ''
        var data = userparams
        var email = "id='" + data.id + "'";

        var email_select = await common_service.selectdata('tbl_reg', field, id, orderby, email)
        if (email_select.length == 0) {
            const result_data = await common_service.error(400, " user not found...",null)
            return result_data    
        }else{
            
            var result = await common_service.delete_data('tbl_reg', data.id)
            if(result){
                var result_data = await common_service.success(200, "user delete sucess",null)
                return result_data
            }else{
                const result_data = await common_service.error(400, " user delete found...",null)
                return result_data
            }
        }

    }else{
        let result_data = await common_service.error(400, "insert user id...",null)
        return result_data

    }
}

async function add(userparams) {

    
	console.log(userparams)
    const mo = JSON.parse(userparams)
    if(mo.mobile.length == 10){
        const token = user_token(16)
        let field = ''
        let id = ''
        let orderby = ''
        var data = JSON.parse(userparams)
        var email = "email='" + data.email + "'";

        var email_select = await common_service.selectdata('tbl_reg', field, id, orderby, email)

        if (email_select.length == 0) {

            var mobile = "mobile=" + data.mobile;
            var mobile_select = await common_service.selectdata('tbl_reg', field, id, orderby, mobile)
            if (mobile_select.length == 0) {
                var array = []
                
                const pass = sha512(data.password)

            
                array['password'] = pass;
                array['first_name'] = data.first_name;
                array['last_name'] = data.last_name;
                
                array['mobile'] = data.mobile;
                array['email'] = data.email;
                array['dob'] = data.dob;
                array['user_token'] = token
                array['username'] =data.username;
                console.log(array);
                var insert = await common_service.insert('tbl_reg', array)
                if(insert){
                    var result_data = await common_service.success(200, "register sucess",null)
                    return result_data
                }else{
                    var result_data = await common_service.error(400, "register faild",null)
                    return result_data
                }
            }
        }
    }
}



async function update(userparam, id) {
try{
    if (!id) {
        var result = common_service.error(400, "Id is not found")
        return result
    }  else {
        var field = 'first_name,last_name,user_token'
        var orderby = ''
        var data = await common_service.selectdata('tbl_reg', field, id, orderby)

        if (data.length == 1) {
                var update_array = []
               
                update_array['first_name'] = userparam.first_name;
                update_array['last_name'] = userparam.last_name;
                // array['username'] =data.username;
                update_array['dob'] = userparam.dob;
               

                var result = await common_service.update_field('tbl_reg', update_array, id)

                if(result){
                    var result_data = await common_service.success(200, "register update sucess",null)
                    return result_data
                }else{
                    var result_data = await common_service.error(400, "register update faild",null)
                    return result_data
                }
            } else {
                var result = common_service.error(400, "Invalid user token")
                return result
            }
        } 
    }catch(e){
        const data = await common_service.error(400, "parameter is not valid!..")
        return data
    }

    }

