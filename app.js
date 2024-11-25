const express = require("express")
const createHttpError = require("http-errors")
const morgan = require("morgan")
const mongoose = require("mongoose")
require('dotenv').config()


const app = express()
app.use(morgan('dev')); // to get log statements in the console we use morgan package 

app.get('/', (req, res, next) => {
    res.send("Server is working")
})
app.use((req, res, next) => {
    next(createHttpError.NotFound()) // this is the 404 ERROR HANDLER 
});

app.use((error, req, res, next) => {
    error.status = error.status || 500
    res.status(error.status)
    res.send(error)
})
const PORT = process.env.PORT || 3000


mongoose.connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME
}).then(() =>{
    console.log("💾 connected")
    app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`))
}).catch((err) => {1
    console.log(err)
})
// its a promise so it will take time to return the response hence if the database is not connected then there is no point in waiting and connecting to the port as we will not be able to serve the client 