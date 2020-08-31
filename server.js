const express = require("express")
const mongoose = require("mongoose")

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static("public"))

require("./routes/mainroutes")(app)
require("./routes/userroutes")(app)
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  })

mongoose.connect(process.MONGODB_URI || "mongodb://localhost/stockhistorydb", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })



app.listen(PORT, err => {
    if (err) throw err
    console.log("Listening on port " + PORT)
})