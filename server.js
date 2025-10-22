// The address of this server connected to the network is:
//URL --> htttp://localhost:5000
//IP-->127.0.0
// import express from "express"
// import helmet from "helmet"// helmet is middleware for security purpose
// const app=express();

// app.use(helmet());


// app.use(morgan("dev"));//log the requests

// const PORT= 5000

// //HTTP verbs and routh or path

// app.listen(PORT,()=>console.log(`server is running on: ${PORT}`))


import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import productRoutes from "./routes/productRoutes.js";
import {sql} from "./config/db.js";

dotenv.config();

const PORT=process.env.PORT|| 5000;

const app = express();

app.use(express.json());//in comming data
app.use(cors());//enables cross-origin requests
app.use(morgan("dev"));//middleware  is helps you protect your app by setting various HTTP headers
app.use(helmet());//log the requests

//apply arcject

// app.use(async(req,res,next)=>{
// try{
//     const decision=await aj.protect(req,{
//         requested:1
//     })
//     if(decision.isDenied()){
//      if(decision.reason.isRateLimit()){
//         res.status(429).json({
//             error:"Too many requests"
//         });}
//     else if(decision.reason.isBot()){
//       res.status(403).json({error:"Bot access denied"});
//     }else {
//         res.status(403).json({error:"Forbidden"});
//     }
//     return
// }
// //check for spoofed bots fake bots
// if(decision.results.some((result)=>result.reason.isBot()&& result.reason.isSpoofed())){
//     res.status(403).json({error:"spoofed bot detected"});
//     return;
// }
//     next()
// }catch(error){
//  console.log("Arcjet error",error);
//  next(error);
// }
// });

app.use("/api/products",productRoutes);



async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                image VARCHAR(255) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log("✅ Database initialized successfully");
    } catch (error) {
        console.error("❌ Error initializing database:", error);
        process.exit(1); // stop server if DB fails
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
});
