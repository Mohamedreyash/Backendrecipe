const express=require("express")
const mongoose = require('mongoose');
const app=express()
const dotenv=require("dotenv")
const routes=require("./Backendrecipe/routes/routes");
const UserRouter = require("./Backendrecipe/routes/user")
var cors=require("cors")
app.use(cors());
const body=require("body-parser");
app.use(body.json())
dotenv.config();
app.use(express.json({limit:"5mb"}));
app.use("/",routes)

app.use(cors())
app.use(express.json());
const port = process.env.PORT || 5000;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log(err);
})

app.use("/", UserRouter);
app.get("*", (req, res) => {
    res.status(404).send("404 PAGE NOT FOUND")
})

app.listen(port, () => {
    console.log(`server is running at ${port}`);
})