const mongoose = require('mongoose')

const {Schema} = mongoose

const DataSchema = new Schema (
    {
       
        thing: String,
        date: String ,
        user_id :{ 
            type: mongoose.Schema.Types.ObjectId , 
            required : true ,
            ref : 'User'
        } 
    }
)

const DataModel = mongoose.model('Data' , DataSchema);

module.exports = DataModel