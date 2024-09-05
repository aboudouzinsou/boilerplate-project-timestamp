// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


app.use(express.json());

function formatDateToUTC(date) {
  return new Date(date).toUTCString();
}


// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoint to get the current time in UTC
app.get('/api/:date?', (req, res) => {
  const date = req.params.date;
  const utcDate = formatDateToUTC(date);

  if(!date) {
    date = new Date();
  } else if (!isNaN(date)) {
    date = new Date(parseInt(date));
  } else {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  
  res.json({ unix: utcDate.getTime(), utc: utcDate });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
