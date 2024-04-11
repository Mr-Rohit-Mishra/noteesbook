const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/phonebookbackend";


const connectToMongo = async ()=> {

    try{
        await mongoose.connect(mongoURI);
        console.log("connection successful to db")
    } catch (error){
        console.error("database connection failed")
        process.exit(0);
    }

};

module.exports = connectToMongo;