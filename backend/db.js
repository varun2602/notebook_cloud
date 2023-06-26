const mongoose = require("mongoose") 

const ConnectToMongo = function(){
    mongoose.connect("mongodb://127.0.0.1:27017/inotebook").then(
    () => {
        console.log("Connected to database")
    }
).catch(function(error){
    console.log("error", error)
})
}

module.exports = ConnectToMongo