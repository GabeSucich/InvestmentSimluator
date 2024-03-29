const express = require("express")
const mongoose = require("mongoose")
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
  }

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/stockhistorydb", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

require("./routes/mainroutes")(app)
require("./routes/userroutes")(app)

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  })

app.listen(PORT, err => {
    if (err) throw err
    console.log("Listening on port " + PORT)
})