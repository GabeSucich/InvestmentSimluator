const mongoose = require("mongoose")

mongoose.connect(process.MONGODB_URI || "mongodb://localhost/stockhistorydb", { useNewUrlParser: true })

const User = require("../models/User")

const Users = {

    findUser(username) {
        
        return User.findOne({username: username}).exec()
    },
    
    createUser(username, password) {
        
        return User.create({username: username, password: password})
    }

}

module.exports = Users