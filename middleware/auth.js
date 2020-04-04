var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("MD5");
var mysql = require('mysql');
var response = require('../res');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/secret');
var ip = require("ip");


//registrasi user baru
exports.registrasi = function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];
    query = mysql.format(query, table);
    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        }
        else {
            if (rows.length == 0) {
                var query = "INSERT INTO  ?? SET  ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil Menambahkan Data!", res);
                    }
                });

            }
            else {
                response.ok("Email Sudah Terdaftar!", res);
            }
        }
    });
}


//login user
exports.login = function (req, res) {

    //var em = req.body.email || req.query.email;
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";

    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error)
        }
        else {

            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: 1440
                });
                id_user = rows[0].id;
                console.log(id_user);
                console.log(token);
                console.log(ip.address());
                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }
                var query = "INSERT INTO  ?? SET  ?";
                var table = ["akses_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token generated',
                            token: token,
                            currUser: data.id_user
                        });
                    }
                });
            }
            else {
                res.json({ "Error": true, "Message": "wrong email/password combination" });
            }

        }
    });
}



exports.test = function (req, res) {
    response.ok("Test Router!", res);
};

//halaman untuk user role =2
exports.rahasiauser = function (req, res) {
    response.ok("URL Authentifikasi role 2!", res);
};

//halaman untuk user role =1
exports.rahasiaadmin = function (req, res) {
    response.ok("URL Authentifikasi role 1!", res);
};

