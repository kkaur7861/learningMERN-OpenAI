import app from "./app.js"
import { connectToDatabase } from "./db/connection.js";
// app.get('/',(req,res,next)=> {
//   return res.send("hello");
// })

//connection and listeners
connectToDatabase().then(()=>{
  app.listen(5000,()=> console.log("open the server and connect to database:-------"));
}).catch((err)=> console.log(err));
