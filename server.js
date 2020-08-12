const express = require("express")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3000

const app = express()

//Here is an example change

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static("public"))

require("./routes")(app)

mongoose.connect(process.MONGODB_URI || "mongodb://localhost/stockhistorydb", { useNewUrlParser: true })

app.listen(PORT, err => {
    if (err) throw err
    console.log("Listening on port " + PORT)
})