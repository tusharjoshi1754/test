const expressJwt = require('express-jwt');
const config = require('../config.json');



module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/login/user-login',
            '/user/register'      
            
                
        ]
    });
}