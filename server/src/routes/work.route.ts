import express from "express"
import { createWorkSpace, getActiveWorkspaces, getWorkspaceById } from "../controllers/workspace.controller"
import { userAuth } from "../middlwares/authenticate.middleware"
import errorCatch from "../middlwares/catchErro.middleware"
import { deleteWorkSpaceById } from "../controllers/space.controller"

const workspace=express.Router()
workspace
.post("/create",userAuth,errorCatch(createWorkSpace))
.delete("/:id",userAuth,errorCatch(deleteWorkSpaceById))
.get("/",userAuth,errorCatch(getActiveWorkspaces))
.get("/:id",userAuth,errorCatch(getWorkspaceById))



export {workspace}    