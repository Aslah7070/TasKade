//* libraries and packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import { env } from "./configs/env.configs";
import { connectDb } from "./configs/mongo.config";
import { router } from "./routes/auth.route"
import {adminRoute} from "./routes/admin.route"
import { workspace } from "./routes/work.route";
import {space} from "./routes/space.route"
import {task} from "./routes/task.route"
import {list} from "./routes/list.routes"
import { connectRedis } from "./configs/redis.config";
import addStandardResponse from "./middlwares/standerdResponse.middleware";

const app = express();
app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser()); 
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(addStandardResponse)

app.use("/api/auth",router)
app.use("/api/admin",adminRoute)
app.use("/api/workspace",workspace) 
app.use("/api/space",space)
app.use("/api/task",task)
app.use("/api/list",list)
connectDb();
connectRedis();      


app.listen(env.PORT, () => console.log(`Server started at ${env.PORT} `));

  