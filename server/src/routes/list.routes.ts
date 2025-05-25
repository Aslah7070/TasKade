import express from "express";
import { userAuth } from "../middlwares/authenticate.middleware";
import errorCatch from "../middlwares/catchErro.middleware";
import { createList, getAllLists } from "../controllers/list.controller";

const list = express.Router();

list.post("/:spaceId",userAuth,errorCatch(createList));
list.post("/:spaceId",userAuth,errorCatch(getAllLists));



export {list};
 