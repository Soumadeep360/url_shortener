const express=require('express');
const path=require('path');
const URL=require('./models/url');
const cookieParser=require('cookie-parser');
const {checkAuthentication,restrictTo}=require('./middlewares/auth');
const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const userRoute=require('./routes/user')
const {connectToMongoDb}=require('./connect');

const PORT=8000
const app=express()
connectToMongoDb('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log('mongooDb connected!!')
})


app.set("view engine", "ejs"); //using ejs view engine for server side rendering..
app.set("views",path.resolve("./views")) //location at which my view is present

app.use(express.json()) //middleware to support json data..
app.use(express.urlencoded({extended:false})); //middleware to support form data...
app.use(cookieParser()); 
app.use(checkAuthentication);


app.use('/url',restrictTo(['NORMAL']),urlRoute);
app.use('/user',userRoute);
app.use('/',staticRoute);

app.get("/url/:shortID",async (req,res)=>{
    const shortID=req.params.shortID;
    const entry=await URL.findOneAndUpdate(
    {
        shortID,
    },
    {
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    }
    );
    res.redirect(entry.redirectURL);
})
app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})