'use strict';

import AlexaSkillResponse from './AlexaSkillResponse';

console.log('Loading Alexa Wunderground function');

exports.handler = (event, context, callback) => {
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

            let response = new AlexaSkillResponse();
            let currentTemp = Math.round(current.temp_f);
            let feelsLikeTemp = Math.round(current.feelslike_f);
            response.response.outputSpeech.text = `Right now in ${current.display_location.city}, it is ${current.weather} and the temperature is ${currentTemp} degrees`;
            response.response.outputSpeech.text += (currentTemp === feelsLikeTemp) ? '.' : `, but it feels like ${feelsLikeTemp}.`;
            callback(response);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        context.done(null, 'FAILURE');
    });      
};
