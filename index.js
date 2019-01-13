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
    const amount = req.body.amount;
    const baseURL = `https://apiv2.bitcoinaverage.com/convert/global`;
    const options = {
      url:  baseURL,
      method: "GET",
      qs: {
        from: crypto,
        to: fiat,
        amount: amount
      }
    };
  request(options, function (error, response, body) {
    const data = JSON.parse(body);
    const price = data.price;
    // console.log(price);
    const currentDate = data.time;
    res.write(`<p>The current date is ${currentDate}</p>`);
    res.write(`<h1>The current price of ${amount} ${crypto} is ${price} ${fiat}</h1>`);
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

