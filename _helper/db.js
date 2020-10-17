const {Client } = require('pg')


const client = new Client({
  user: 'wamydboi',
  host: 'salt.db.elephantsql.com',
  database: 'wamydboi',
  password: 'xHJbVOs_6q73FIquHlLQ_GFNyOznyOqO',
  port: 5432,
})
var conn=client.connect()
if(!conn){
  
    console.log("Data base not connect")
}
else{
  
  console.log("database connect")
}
module.exports =client