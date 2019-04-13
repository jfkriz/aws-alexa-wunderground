'use strict';

let Skill = require('../skill');
let wundergroundApiClient = require('../../common/wundergroundApiClient');

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
        wundergroundApiClient.get(
            wundergroundApiClient.Feature.CurrentConditions,
            (result) => {
                console.log(`Result: ${JSON.stringify(result)}`);
                let currentTemp = Math.round(result.current_observation.temp_f);
                let feelsLikeTemp = Math.round(result.current_observation.feelslike_f);
                let responseText = [];
                responseText.push(`Right now in ${result.current_observation.display_location.city}, it is ${result.current_observation.weather}`);
                responseText.push(`The temperature is ${currentTemp} degrees ${(currentTemp === feelsLikeTemp) ? '' : ', but it feels like ' + feelsLikeTemp}`);
                callback(responseText.join('. '));
            },
            (error) => {
                console.log(`Error: ${JSON.stringify(error)}`);
                callback('I\'m sorry, there was a problem getting the current weather for you.');
            }); 
    }
}

module.exports = GetCurrentWeather;