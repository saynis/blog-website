import express from "express";
import cors from "cors"

const app = express()
app.use(express.json())

const corsOption = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}


app.use(cors(corsOption))

import userRoute from "../routes/userRoute.js"
app.use("/api/users/", userRoute)

import postRoutes from '../routes/postsRoute.js'
app.use("/api/posts/", postRoutes)


import commentsRoute from "../routes/commentsRoute.js"
app.use("/api/comments/", commentsRoute)



app.listen(3000, () => {
    console.log("http://localhost:3000")
})


// yes