const mongoose = require("mongoose");

function connectDB(){

    mongoose.connect('mongodb+srv://navateja:navateja88011@nodetuts.dw7vlvt.mongodb.net/rentwheels' , {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })


}



module.exports = connectDB;