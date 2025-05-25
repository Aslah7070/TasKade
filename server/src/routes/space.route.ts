import express from "express"
import { userAuth } from "../middlwares/authenticate.middleware"
import errorCatch from "../middlwares/catchErro.middleware"
import { createSpace, deleteSpaceById, getAllSpaces, getSpace, getSpaceById, updateSpace } from "../controllers/space.controller"

const space=express.Router()
space
.post("/create",userAuth,errorCatch(createSpace))
.get("/",userAuth,errorCatch(getAllSpaces))
.get("/:id",userAuth,errorCatch(getSpaceById))
.delete("/:id",userAuth,errorCatch(deleteSpaceById))
.patch("/:id",userAuth,errorCatch(updateSpace))


export {space}