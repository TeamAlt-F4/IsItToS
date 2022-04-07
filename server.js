const express = require('express');
const app = express();
const port = 3000;
const {google, datacatalog_v1} = require('googleapis');
const XLSX = require('xlsx');
const cors = require('cors');
app.use(cors());

//------------------Searches Database and Youtube API for rating------------------//
app.get('/getStatus/:VideoID', cors(), (req, res) =>{
    
  //localhost:3000/getStatus/{VideoID}        <-- Example call from localhost
    
  var VideoID = req.params.VideoID;
  var wb = XLSX.readFile('./database.xlsx');
  var ws = wb.Sheets['Sheet1'];
  var data = XLSX.utils.sheet_to_json(ws);
  var notFound = new Boolean(true);

  //Search Database
  for(var i= 0;i<data.length;i++){
    if(data[i].video_id == VideoID){
      const Response = '{"moderator rating":"'+data[i].moderator_rating+'", "comment":"'+data[i].comment+'"}'
      const JSONResponse = JSON.parse(Response);
      console.log(JSONResponse);
      res.send(JSONResponse);
      notFound = false;
      break;
    }
  }

  //If not found in database, search from Youtube API
  if(notFound){
    google.youtube('v3').videos.list({
      key: 'AIzaSyAk7sGBtLkbPyUuq-i9KlJsB_uQWufpv08',
      part: 'contentDetails',
      id: VideoID,
      maxResults: 1
    }).then((Response) =>{
      
      //console.log(JSON.stringify(Response.data.items[0].contentDetails.contentRating));
      var ageRestricted = JSON.stringify(Response.data.items[0].contentDetails.contentRating.ytRating);
      
      //Set rating
      var Response;
      if(ageRestricted == "ytAgeRestricted"){
        const Response = '{"moderator rating":"nsfs", "comment":" "}'
        const JSONResponse = JSON.parse(Response);
        res.send(JSONResponse);
        var rating = 1;
        var MR = 'nsfs'
      }else{
        const Response = '{"moderator rating":"safe", "comment":" "}'
        const JSONResponse = JSON.parse(Response);
        res.send(JSONResponse);
        var rating = 0;
        var MR = 'safe';
      }

      //New entry
      let input = [{
        video_id: VideoID,
        comments: "",
        moderator_rating: MR,
        age_restricted: rating
      }]

      //Add new Video ID to Database with rating
      var size = data.length+2;
      XLSX.utils.sheet_add_json(ws, input, {skipHeader:true, origin: 'A'+size});
      XLSX.writeFile(wb,'./database.xlsx');
      console.log('Added to Database');

    }).catch((err) => console.log(err));
  }
  
});
//--------------------------------------------------------------------------------//

app.get('/getComment/:VideoID',(req,res) =>{
  
  var VideoID = req.params.VideoID;
  var wb = XLSX.readFile('./database.xlsx');
  var ws = wb.Sheets['Sheet1'];
  var data = XLSX.utils.sheet_to_json(ws);

  //Search Database
  for(var i= 0;i<data.length;i++){
    if(data[i].video_id == VideoID){
      res.send(data[i].comments);
      break;
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
