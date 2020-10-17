const client = require('./_helper/db');
const _ = require('lodash')

const config = require('./config.json');
module.exports = {
    insert,
    selectdata,
    update_field,
    error,
    success,
    jwt_decode,
    email_find,
    delete_data,
   
}

async function insert(table, field) {

    try{
        var field_keys = []
        var valuea = []
        for (var key in field) {
            var value = field[key];
        if (value == null) {
                valuea.push("null")
            }
            else {
                valuea.push("'" + value + "'    ")
            }
            
            field_keys.push(key)
        }
        var data = '"'+table +'"'
        var query = "INSERT INTO " + data + "(" + field_keys + ") values(" + valuea + ")";
        console.log(query)
        const result = await client.query(query);
        if(!result){
            return false
        }
        else{        
        return true
    }
}catch(e){
    const data = await error(400, "insert field!..")
    return data
}
    
}

async function selectdata(table, field, id, orderby, fie_where) {
    // console.log(fie_where)
    
    // try {
        if (field) {
            field = field
        }
        else {
            field = "*";
        }
        if (id == '' || id == null) {
            if (fie_where) {
                where = " where " + fie_where;
            }
            else {
                where = ''
            }
        }
        else {
            where = "where id = '" + id + "'";
        }
        if (orderby == '' || orderby == null) {
            order = "";
        }
        else {
            order = "ORDER BY " + orderby + "";

        }
        var data = '"'+table +'"'
        var query = "SELECT " + field + " FROM " + data + " " + where + " " + order;
console.log(query)
        const result = await client.query(query)
        return result.rows

    // }
    // catch (e) {
    //     const data = await error(400, "selection field!..")
    //     return data
    // }



}
async function update_field(table, field, id) {
    try{
    delete field.id;
    var field_value = '';
    i = 0
  for (var key in field) {
            if (field[key] == null) {
                field[key] = null
            }
            else {
                field[key] = field[key]
            }

            if (i == 0) {
                if (field[key] == null) {
                    field_value = key + "=" + field[key] + "";
                }
                else {
                    field_value = key + "='" + field[key] + "'";
                }
            }
            else {
                if (field[key] == null) {

                    field_value = field_value + "," + key + "=" + field[key] + ""
                }
                else{
                    field_value = field_value + "," + key + "='" + field[key] + "'"
                }
            }
            i++;
        }

    if (id == '' || id == null) {

        where = ''

    }
    else {
        where = "where id = '" + id + "'";
    }
    var data = '"' + table + '"'
    var query = "UPDATE " + data + " SET " + field_value + " " + where + "";
    const result = await client.query(query);
    console.log(query)
    if(result.rowCount == 0){
        return false;
    }
    else{
        return true
    }
    
}catch(e){
    const data = await error(400, "update field!..")
    return data
}


}

async function error(code,message,data){
    var error=[]
    error['status']= code;
    error['message']=message;
    error['list']=data;
    return error
}
async function delete_data(table,id){
    try{
    var data = '"'+table +'"'
    var query = "Delete from "+data+" where id="+id;
    console.log(query)
            const result = await client.query(query)
            return result.rows
    }catch(e){
        const data = await error(400, "delete field!..")
        return data
    }
}

async function success(code,message,data){
    var error=[]
    error['status']= code;
    error['message']=message;
    error['list']=data;
    return error
}
async function jwt_decode(val) {
    const token = val.replace('Bearer ', '')
    var decoded = jwtDecode(token);
    const email = decoded.email
    return email
}
async function email_find(token)
{
    var email=await selectdata('tbl_reg','email,id','','',"user_token='"+token+"'")
    // console.log("email service",email)
    if(email[0] !=null){
        return email
    }
    else{
    
        return false
      
    }
}


