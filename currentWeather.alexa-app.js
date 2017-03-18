'use strict';

import alexa from 'alexa-app';
import getCurrentWeather from './getCurrentWeather';

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
        let current = getCurrentWeather();
        if(current.error) {
            response.fail(current.text);
        } else {
            response.say(current.text);
        }
    }
});

exports.handler = app.lambda();