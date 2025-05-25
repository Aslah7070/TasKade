import express from "express"
import { createWorkSpace, getActiveWorkspaces, getWorkspaceById } from "../controllers/workspace.controller"
import { userAuth } from "../middlwares/authenticate.middleware"
import errorCatch from "../middlwares/catchErro.middleware"

const workspace=express.Router()
workspace
.post("/create",userAuth,errorCatch(createWorkSpace))
.get("/",userAuth,errorCatch(getActiveWorkspaces))
.get("/:id",userAuth,errorCatch(getWorkspaceById))



export {workspace}    