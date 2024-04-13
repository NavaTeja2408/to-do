

const expressAsyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')

const validate = expressAsyncHandler( async(req , res , next) => {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
         jwt.verify(token , process.env.MY_KEY , (err , decoded) => {
            if(err) {
                return res.json('error')
            }

            return res.json(decoded)
            
        })
    }

      

    })


module.exports = validate  