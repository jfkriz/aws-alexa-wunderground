'use strict';

import alexa from 'alexa-app';

app.intent('weather', {
    utterances: [
        'what is the weather',
        'what is the current weather',
        'what\'s the weather',
        'what\'s the current weather',
        'what is the temperature',
        'what is the current temperature',
        'what\'s the temperature',
        'what\'s the current temperature'
    ],
    function(request, response) {
        getCurrentWeather(request, response);
    }
});

function getCurrentWeather(request, response) {
    let apiKey = process.env.WUNDERGROUND_API_KEY;
    let location = process.env.WUNDERGROUND_PWS_ID;
    let currentConditionsUrl = `http://api.wunderground.com/api/${apiKey}/alerts/q/${location}`;
    let http = require('http');
    
    http.get(alertsurl, function(res) {
        res.setEncoding('utf8');
        var rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            var current = JSON.parse(rawData);

            let currentTemp = Math.round(current.temp_f);
            let feelsLikeTemp = Math.round(current.feelslike_f);
            let responseText = `Right now in ${current.display_location.city}, it is ${current.weather} and the temperature is ${currentTemp} degrees`;
            responseText += (currentTemp === feelsLikeTemp) ? '.' : `, but it feels like ${feelsLikeTemp}.`;
            response.say(responseText);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        response.fail('I\'m sorry, I couldn\'t get the current weather for you.')
    });      
}

exports.handler = app.lambda();