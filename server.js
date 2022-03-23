import fetch from "node-fetch";
import express from 'express';

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('here')
    res.send('HI')
})

const videoRouter = require("./routes/videos")
app.use("/video", videoRouter)

var video_id = ""

//call to youtube's api
fetch("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id="+ video_id +"&key=AIzaSyAk7sGBtLkbPyUuq-i9KlJsB_uQWufpv08")

//call to our database

app.listen(3000)
