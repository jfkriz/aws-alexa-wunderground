'use strict';

import Alexa from 'alexa-sdk';
import getCurrentWeather from './getCurrentWeather';

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers([{
        'WeatherIntent': function() {
            let response = getCurrentWeather();
            this.emit(':tell', response.text);
        }
    }]);
};

