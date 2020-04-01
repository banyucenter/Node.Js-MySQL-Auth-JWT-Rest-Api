var mysql = require('mysql');

//buat koneksi database
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_authapi'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysql terkoneksi');
});

module.exports = conn;