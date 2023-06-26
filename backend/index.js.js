const connectToMongo = require("./db")
const express = require("express")

const app = express()
app.use(express.json())

const port = 3000

// Available routes 
app.use("/api/auth", require("./routes/auth.js"))
// app.use("/api/notes", require("./routes/notes.js"))

app.listen(port, function(){
    console.log("app listening at port 3000")
})

connectToMongo();