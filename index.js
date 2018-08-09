"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const http = require('http');
let request = require('request');
let apiKey = '853f18959548a6c27a3ade557ba07812';

const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/weather",function (req, res) {
  var speech =
    req.body.result &&
    req.body.result.parameters &&
    req.body.result.parameters.cityName
      ? req.body.result.parameters.cityName
      : "Seems like some problem. Speak again.";
    //  console.log("input", speech);
  var reqUrl = `http://api.openweathermap.org/data/2.5/weather?q=${speech}&units=metric&appid=${apiKey}`
  request(reqUrl, function (err, response, body) {
    if(err){
      console.log("error", error);
    } else {
      let weather = JSON.parse(body)
      let message = `It's ${weather.main.temp} celsius in ${weather.name} with ${weather.weather[0].description}`;
      return res.json({
       speech: message
      });
    }
  })
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});
