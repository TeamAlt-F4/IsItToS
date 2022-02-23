const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('here')
    res.send('HI')
})

const videoRouter = require("./routes/videos")
app.use("/video", videoRouter)

//call to youtube's api
fetch(
    `{base_URL}/channels?part=contentDetails
                       &mine=true`
)

//call to our database

app.listen(3000)
