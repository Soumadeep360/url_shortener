const express=require('express')
const {handlegenerateNewShortURL,handleGetAnalytics}=require('../controllers/url')


const router=express.Router()

router.post('/',handlegenerateNewShortURL);
router.get('/analytics/:shortID',handleGetAnalytics)


module.exports=router