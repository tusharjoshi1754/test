const client = require('../_helper/db')
var sha512 = require('js-sha512');
const common_service = require('../common_service');
var validator = require("email-validator");



module.exports = {
    authenticate

}


async function authenticate(userparam) {
    // try {
        const emailis = validator.validate(userparam.username)

        if (emailis) {


            var column = '';
            var id = '';
            var order = '';
            var field = "email ='" + userparam.username + "' ";
            var user = await common_service.selectdata("tbl_reg", column, id, order, field)
            if(user.length ==0){
                return false
            }else{
            console.log("user",user)
            
         
            if (user.length != 0) {
                if (sha512(userparam.password) === user[0].password) {
                   
 				
                    var column = 'first_name,last_name,email,mobile,dob,username,user_token';
                    var id = '';
                    var order = '';
                    var field = "email ='" + userparam.username + "' ";
                    var user1 = await common_service.selectdata("tbl_reg", column, id, order, field)
                    if(user1){
                        const data = await common_service.success(200, "login successful", user1[0])
                        return data
                    }else{
                        return false
                    }
                  

                
            } else {

                
                return false
            }
            
        }
    }
        } else {


            var column = '';
            var id = '';
            var order = '';
            var field = "username ='" + userparam.username + "' ";
            var user = await common_service.selectdata("tbl_reg", column, id, order, field)
            
            if (user.length != 0) {
                if (sha512(userparam.password) === user[0].password) {
                   var column = 'first_name,last_name,email,mobile,dob,username,user_token';
                    var id = '';
                    var order = '';
                    var field = "username ='" + userparam.username + "'";
                    var user1 = await common_service.selectdata("tbl_reg", column, id, order, field)
                    if(user1){
                        const data = await common_service.success(200, "login successful", user1[0])
                        return data
                    }else{
                        return false
                    }


         
            } else {

                return false
            }
        
        }
    }

    // } catch (e) {
    //     const data = await common_service.error(400, "parameter is not valid!..")
    //     return data
    // }
}