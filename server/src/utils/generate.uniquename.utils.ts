import { RedisClientType } from "redis";


export async function generateGuestUsername(redisClient:RedisClientType):Promise<string> {
    if (!redisClient) {
        throw new Error("Redis client is not initialized");
    }

    let username="";
    let exists = true; 
  
    while (exists) {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      username = `guest${randomNum}`;
     const  result = await redisClient.exists(username); 
     console.log("res",result);
     
      exists=result===1
      console.log("res",result);
    }
   
    return username; 
  }