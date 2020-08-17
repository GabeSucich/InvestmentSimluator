const express = require("express")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static("public"))

require("./routes/mainroutes")(app)
require("./routes/groutes")(app)
require("./routes/croutes")(app)
require("./routes/jroutes")(app)
require("./routes/sroutes")(app)

mongoose.connect(process.MONGODB_URI || "mongodb://localhost/stockhistorydb", { useNewUrlParser: true })

app.listen(PORT, err => {
    if (err) throw err
    console.log("Listening on port " + PORT)
})