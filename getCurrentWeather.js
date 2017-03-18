exports.getCurrentWeather = function() {    
    let apiKey = process.env.WUNDERGROUND_API_KEY;
    let location = process.env.WUNDERGROUND_PWS_ID;
    let currentConditionsUrl = `http://api.wunderground.com/api/${apiKey}/alerts/q/${location}`;
    let http = require('http');
    
    http.get(alertsurl, function(res) {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => {
            rawData += chunk;
        });
        res.on('end', () => {
            let current = JSON.parse(rawData);

            let currentTemp = Math.round(current.temp_f);
            let feelsLikeTemp = Math.round(current.feelslike_f);
            let responseText = `Right now in ${current.display_location.city}, it is ${current.weather} and the temperature is ${currentTemp} degrees`;
            responseText += (currentTemp === feelsLikeTemp) ? '.' : `, but it feels like ${feelsLikeTemp}.`;
            return {
                text: responseText,
                error: false
            };
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        return {
            text: 'I\'m sorry, I couldn\'t get the current weather for you.',
            error: true
        };
    });
}   