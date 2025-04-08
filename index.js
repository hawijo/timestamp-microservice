// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date?", (req, res) => {
  var date = req.params.date;
  var json = { error: "Invalid Date" };

  const toTimestamp = (date) => Math.floor(date.getTime() / 1);
  const fromTimestamp = (timestamp) => new Date(timestamp * 1);

  let unix, utc;

  if (date) {
    let parsedDate = new Date(date);
    if (!isNaN(parsedDate.getTime())) {
      unix = toTimestamp(parsedDate);
      utc = parsedDate.toUTCString();
    } else if (!isNaN(date)) {
      unix = parseInt(date);
      utc = new Date(fromTimestamp(date)).toUTCString();
    } else {
      return res.json(json);
    }
  } else {
    unix = new Date().valueOf();
    utc = new Date().toUTCString();
  }

  res.json({ unix: unix, utc: utc });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
