import express from "express"
import { createComment, deleteComment, updateComment } from "../controllers/commentsController.js"
import { verifyToken } from "../middleware/authmiddleware.js"

const routes = express.Router()


routes.post("/new", verifyToken, createComment)
routes.put("/:id", verifyToken, updateComment)
routes.delete("/:id", verifyToken, deleteComment)


export default routes