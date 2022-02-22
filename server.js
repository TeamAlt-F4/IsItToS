const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('here')
    res.send('HI')
})

const videoRouter = require("./routes/videos")
app.use("/video", videoRouter)

app.listen(3000)
