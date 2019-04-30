'use strict';

let http = require('https');
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

        // New API: https://docs.google.com/document/d/1eKCnKXI9xnoMGRRzOL1xPCBihNV2rOet08qpE_gArAY/edit
        // let options = {
        //     hostname: 'api.wunderground.com',
        //     path: `/api/${apiKey}/conditions/q/${location}.json`,
        //     method: 'GET'
        // };
        
        let options = {
            hostname: 'api.weather.com',
            path: `/v2/pws/observations/current?stationId=${location}&format=json&units=e&apiKey=${apiKey}`,
            method: 'GET'
        }

        let body = '';

        http.get(options, (response) => {
            response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
                let result = JSON.parse(body);

                console.log(`Result: ${JSON.stringify(result)}`);

                // let currentTemp = Math.round(result.current_observation.temp_f);
                // let feelsLikeTemp = Math.round(result.current_observation.feelslike_f);
                // let responseText = `Right now in ${result.current_observation.display_location.city}, it is ${result.current_observation.weather} and the temperature is ${currentTemp} degrees`;
                let observation = result.observations[0];
                let currentTemp = Math.round(observation.imperial.temp);
                let feelsLikeTemp = currentTemp >= 70 ? Math.round(observation.imperial.heatIndex) : Math.round(observation.imperial.windChill);
                let responseText = `Right now in ${observation.neighborhood}, the temperature is ${currentTemp} degrees`;
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