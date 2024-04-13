
const User = require('../models.js');
const Data = require('../datamodel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');


const signin = asyncHandler(async (req , res) => {
    try {
 
     const {name , password , cpassword} = req.body
 
     if (!name )  {
         return res.json(
             {
                 error: 'name is not entered'
             }
         )
     }
 
     if(!password){
         return res.json(
             {
                 error: 'password is not entered'
             }
         )
     }

     if(password != cpassword) {
        return res.json({
            error : 'password doesnt match'
        })
     }

     const userExist = await User.findOne({name})

     if(userExist){
        return res.json({
            error : 'User Already exist'
        })
     }

     const hashedPassword = await bcrypt.hash(password , 10 )
 
   
     const user = await User.create(
         {
             name , password : hashedPassword
         }
     )
     
     return res.json('sucessful sinfup')
     
    } catch (error) {
     console.log(error)
    }
 }
)

 

 const login =  async (req , res) => {
    try {
        const {name , password}  = req.body

        userdata = await User.findOne({name})

        if(!userdata) {
            res.json({
                error: 'User Not Exist'
            })
        }

        bcrypt.compare(password , userdata.password , (err , result) => {
            if (err) {
                console.log(err)
            };
            if(result){
               const accesstoken = jwt.sign(
                {name : userdata.name ,
                    id : userdata._id
                }
                , process.env.MY_KEY , {expiresIn: "24h"})

                return res.json({
                    jwttoken : accesstoken
                })

            }

            else {
                return res.json(
                    {
                       error: 'Crediantial Not coreect'
                    }
                )
            } 
        })
      

        


        
    } catch (error) {
        console.log(error)
    }
}
 

const getdataid = async(req , res) => {

    try {
        const {dataid} = req.body
        res.cookie('id', dataid, { sameSite: 'None', maxAge: 3600000 });
        return res.json(dataid)
    } catch (error) {
        console.log(error)
    }

}


const getdata = async(req , res) => {
    const {id} = req.body 

    const datalist = await Data.find(id)
    return res.json(datalist)


}


const adddata = asyncHandler(async (req , res) => {
    try {
 
     const {thing , date , id} = req.body

 
     if (!thing )  {
         return res.json(
             {
                 error: 'name is not entered'
             }
         )
     }
 
     if(!date){
         return res.json(
             {
                 error: 'password is not entered'
             }
         )
     }

 
   
     const newdata = await Data.create(
         {
             thing , date , user_id : id
         }
     )
     
     return res.json('Data is added succesfully')
     
    } catch (error) {
     console.log(error)
    }
 }
)


const deletedata = asyncHandler(async(req , res) => {

    const {dataId} = req.body

    const todoData =  await Data.findByIdAndDelete(dataId)

    if(!todoData) {
        return res.json({
            error : 'data is not available to delete'
        })
    }

    return res.json('data is deleted succesfully')



})




module.exports = {
    login , signin , adddata , getdata , getdataid , deletedata
}

