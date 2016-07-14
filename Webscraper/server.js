/**
* Main class containing business logic for the code
**/

// Basic Initializations
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

//Logic is here
app.get('/scrape', function(req,res){
  // Specify the target URL
  url = 'http://www.imdb.com/title/tt1289401'; //Ghostbusters is waiting for ya ;)

  request(url, function(error, response, html){
    if(!error){
        var $ = cheerio.load(html);

    var title, release, rating;
    var json = { title : "", release : "", rating : ""};

    $('.header').filter(function(){
        var data = $(this);
        title = data.children().first().text();
        release = data.children().last().children().text();

        json.title = title;
        json.release = release;
    })

    $('.star-box-giga-star').filter(function(){
        var data = $(this);
        rating = data.text();

        json.rating = rating;
    })
}

// Basic formatting + Callback file
fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    console.log('File successfully written! - Check your project directory for the output.json file');
})

// Check the console from the website
res.send('Check your console!')

    }) ;
})

// Ports information
app.listen('8080')
console.log("Target port is: 8080");
exports = module.exports = app;
