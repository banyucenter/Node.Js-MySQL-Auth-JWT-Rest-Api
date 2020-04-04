const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(roles) {
    return function (req, res, next) {
        // check authorization header
        var tokenWithBearer = req.headers.authorization;
        if (tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            // verifies secret and checks exp
            jwt.verify(token, config.secret, function (err, decoded) {
            
                if (err) {
                    return res.status(401).send({ auth: false, message: 'Token tidak terdaftar!.' });
                } else {
                    if (roles == 2) {
                        // if everything is good, save to request for use in other routes
                        req.auth = decoded;
                        next();
                    } else {
                        return res.status(401).send({ auth: false, message: 'Gagal Mengotorisasi.' });
                    }
                }
            });
        } else {
            return res.status(403).send({ auth: false, message: 'Token tidak tersedia.' });
        }
    }

}

module.exports = verifikasi;