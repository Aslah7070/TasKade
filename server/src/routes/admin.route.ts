
import express from "express";
import { createQuote } from "../controllers/admin.controller";
const adminRoute =express.Router()

adminRoute

.post("/createquote",createQuote)



export  {adminRoute}