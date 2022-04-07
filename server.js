const express = require('express');
const app = express();
const port = 3000;
const {google, datacatalog_v1} = require('googleapis');
const XLSX = require('xlsx');

//------------------Searches Database and Youtube API for rating------------------//
app.get('/getStatus/:VideoID', (req, res) =>{
    
  //localhost:3000/getStatus/{VideoID}        <-- Example call from localhost
    
var VideoID = req.params.VideoID;
var wb = XLSX.readFile('./database.xlsx');
var ws = wb.Sheets['Sheet1'];
var data = XLSX.utils.sheet_to_json(ws);
var notFound = new Boolean(true);

//Search Database
for(var i= 0;i<data.length;i++){
  if(data[i].video_id == VideoID){
    console.log(data[i].age_restricted);
    res.send(data[i].age_restricted.toString());
    notFound = false;
    break;
  }
}

  //If not found in database, search from YouTube API
  if(notFound){
    google.youtube('v3').videos.list({
      key: 'AIzaSyAk7sGBtLkbPyUuq-i9KlJsB_uQWufpv08',
      part: 'contentDetails',
      id: VideoID,
      maxResults: 1
    }).then((Response) =>{
      
      //console.log(JSON.stringify(Response.data.items[0].contentDetails.contentRating));
      var ageRestricted = JSON.stringify(Response.data.items[0].contentDetails.contentRating);
      
      //Set rating
      if(ageRestricted = " "){
        res.send('0');
        var rating = 0;
        var MR = 'safe';
      }else{
        res.send('1');
        var rating = 1;
        var MR = 'not safe'
      }

      //New entry
      let input = [{
        video_id: VideoID,
        comments: "",
        moderator_rating: MR,
        age_restricted: rating
      }]

      //Add new Video ID to Database with rating
      var size = data.length+2;``
      XLSX.utils.sheet_add_json(ws, input, {skipHeader:true, origin: 'A'+size});
      XLSX.writeFile(wb,'./database.xlsx');
      console.log('Added to Database');

    }).catch((err) => console.log(err));
  }
  
});
//--------------------------------------------------------------------------------//

app.get('/Comment',(req,res) =>{
  res.send('hi');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
