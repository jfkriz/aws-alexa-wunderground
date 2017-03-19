'use strict';

let http = require('http');
let Skill = require('../skill');

class GetCurrentWeather extends Skill {
    constructor(context) {
        super(context);
    }

    execute() {
        this.getText((text) => {
            this.context.succeed(this.generateResponse(this.buildSpeechletResponse(text, true), {}));
        });
    }

    // Call wunderground API to get current conditions:
    getText(callback) {
        let apiKey = process.env.WUNDERGROUND_API_KEY;
        let location = process.env.WUNDERGROUND_PWS_ID;        

        let options = {
            hostname: 'api.wunderground.com',
            path: `/api/${apiKey}/conditions/q/${location}.json`,
            method: 'GET'
        };

        let body = '';

        http.get(options, (response) => {
            response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
                let result = JSON.parse(body);

                console.log(`Result: ${JSON.stringify(result)}`);

                let currentTemp = Math.round(result.current_observation.temp_f);
                let feelsLikeTemp = Math.round(result.current_observation.feelslike_f);
                let responseText = `Right now in ${result.current_observation.display_location.city}, it is ${result.current_observation.weather} and the temperature is ${currentTemp} degrees`;
                responseText += (currentTemp === feelsLikeTemp) ? '.' : `, but it feels like ${feelsLikeTemp}.`;
                callback(responseText);
            });
        }).on('error', (e) => {
            console.log("Got error: " + e.message);
            callback('I\'m sorry, there was a problem getting the current weather for you.');
        });
    }
}

module.exports = GetCurrentWeather;