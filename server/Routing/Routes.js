const express = require('express');
const router = express.Router()
const cors = require('cors')
const {login  , signin , adddata , getdata , getdataid , deletedata} = require('../Components/routeComponents');
const validate = require('../Components/verifyToken');




const corsoption = {
    credentials: true ,
    origin: 'http://localhost:3000' ,
    optionStatus : 200

}


router.use(cors(corsoption))








router.post('/signin' , signin)

router.post('/login'  , login)


router.get('/current'  , validate )


router.post('/adddata'  , adddata)

router.get('/getdata' , getdata)

router.post('/dataid' , getdataid)

router.delete('/deletedata' , deletedata)





module.exports = router