require('dotenv').config();
const { google } = require('googleapis');

google.youtube('v3').videos.list({
    key: process.env.YT_KEY,
    part: 'contentDetails',
    id: 'j3PLLOreTLY',
    maxResults: 1,
}).then((response) => {
    console.log(JSON.stringify(response.data.items[0]));
}).catch((err) => console.log(err));