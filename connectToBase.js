/*
const reader = require('xlsx');
  
var wb = reader.readFile('./test.xlsx');

var ws = wb.Sheets['Sheet1'];

let input = [{
    VideoID: '6jzEApBGsqo',
    URL: 'https://www.youtube.com/watch?v=6jzEApBGsqo',
    Status: 0
}];


reader.utils.sheet_add_json(ws, input, {skipHeader:true, origin: -1});
var data = reader.utils.sheet_to_json(ws);
reader.writeFile(wb,'./test.xlsx')
console.log(JSON.stringify(data));
*/


var wb = XLSX.readFile('./test.xlsx');
var ws = wb.Sheets['Sheet1'];
var data = XLSX.utils.sheet_to_json(ws);
var bool = new Boolean(true);

for(var i=0; i<data.length;i++){
    var key = data[i];
    if(key.VideoID == vid_ID){
        console.log("Exists");
        bool = false;
        break;
    }
}
if(bool){
    console.log("Does Not Exist");

    let input = [{
        VideoID: vid_ID,
        URL: 'https://www.youtube.com/watch?v=' + vid_ID,
        Status: 1 //Should be getConentRating(vid_ID)
    }];
    var size = data.length+2
    XLSX.utils.sheet_add_json(ws, input, {skipHeader:true, origin: 'A'+size});
    XLSX.writeFile(wb,'./test.xlsx')
}
console.log(JSON.stringify(data));

