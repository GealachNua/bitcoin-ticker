// jslint esversion: 6
// jslint devel: true
//  jslint node: true;
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
  "use strict";
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    "use strict";
    const crypto = req.body.crypto;
    const fiat = req.body.fiat;
    const finalURL = `https://apiv2.bitcoinaverage.com/indices/global/ticker/${crypto}${fiat}`;
  // console.log(req.body.crypto);
  request(finalURL, function (error, response, body) {
    const data = JSON.parse(body);
    const price = data.last;
    // console.log(price);
    const currentDate = data.display_timestamp;
    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h1>The current price of ${crypto} is ${price} ${fiat}</h1>`);
    res.send();
  });
});

// app.post("/", function(req, res) {
//   console.log(req.body.fiat);
// });

app.listen(3000, function () {
    "use strict";
  // console.log("Server is running on port 3000.");
});

