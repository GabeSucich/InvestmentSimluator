const Users = require("../controllers/usercontroller")

module.exports = function(app) {

    app.get("/api/user/:username", (req, res) => {
    
        const username = req.params.username

        Users.findUser(username).then(dbUser => {
            res.json(dbUser)
        })

    })

    app.post("/api/user", (req, res) => {

        const {username, password} = req.body

        Users.findUser(username).then(dbUser => {
            if (dbUser) {
                res.json(null)
            }
            else {
                Users.createUser(username, password).then(user => {
                    res.json(user)
                })
            }
            // Users.createUser(username, password).then(dbUser => {
            // res.json(dbUser)
        // })
        })
        

    })

}
