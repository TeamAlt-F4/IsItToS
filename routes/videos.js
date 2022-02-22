const express = require("epress")
const router = express.Router()

const videoInfo = {
    "id":1,
    "name" : "How to Tie a Tie",
    "TOS" : true
}

router.get("/", (req, res) => res.json(videoInfo))

module.exports = router