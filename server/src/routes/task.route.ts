import express from "express"
import { createTask, deleteTask, getAllTask, getTaskById, moveTask, updateTask } from "../controllers/task.controller"
import { userAuth } from "../middlwares/authenticate.middleware"
import errorCatch from "../middlwares/catchErro.middleware"
const task=express.Router()

task
.post("/create/:spaceId",userAuth,errorCatch(createTask) )




task.get("/:spaceId/:taskId",errorCatch(getTaskById));
task.get("/:workspaceId",errorCatch(getAllTask));


task.put( "/:spaceId/:taskId",userAuth,errorCatch(updateTask));
task.delete("/:spaceId/:taskId",userAuth, errorCatch(deleteTask));
task.patch( "/:spaceId/:taskId",userAuth, errorCatch(moveTask));

export {task}