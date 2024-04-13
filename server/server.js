const express = require("express");
const cors = require('cors');
const dotenv = require('dotenv').config()
const {mongoose} = require('mongoose')
const cookieParser = require('cookie-parser');



mongoose.connect(process.env.MANGO_URL).then(
    () => {console.log('Database is connected')}
).catch(() => {console.log('Database is not Connected')})




const server = express();




server.use(express.json())
server.use(cookieParser())
server.use(express.urlencoded({extended : false}))





server.use('/' , require('./Routing/Routes.js'))





server.listen(8000 , () => {
    console.log("server is running")
})

