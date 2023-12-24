const express=require('express')
const URL=require('./models/url')
const urlRoute=require('./routes/url');
const {connectToMongoDb}=require('./connect')

const PORT=8000
const app=express()
connectToMongoDb('mongodb://127.0.0.1:27017/short-url').then(()=>{
    console.log('mongooDb connected!!')
})

app.use(express.json()) //middlewares..
app.use('/url',urlRoute);
app.get("/:shortID",async (req,res)=>{
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