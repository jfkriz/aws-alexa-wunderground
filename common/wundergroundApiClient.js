'use strict';

let http = require('http');

class WundergroundApiClient {
    constructor() {
    }

    Feature = {
        CurrentConditions: 'conditions'
    }

    get(feature, successCallback, errorCallback) {
        let apiKey = process.env.WUNDERGROUND_API_KEY;
        let location = process.env.WUNDERGROUND_PWS_ID;

        let options = {
            hostname: 'api.wunderground.com',
            path: `/api/${apiKey}/${feature}/q/${location}.json`,
            method: 'GET'
        };

        let body = '';
        http.get(options, (response) => {
            response.on('data', (chunk) => { body += chunk })
            response.on('end', () => {
                let result = JSON.parse(body);
                if(successCallback) {
                    successCallback(result);
                }
            });
        }).on('error', (e) => {
            if(errorCallback) {
                errorCallback(e);
            }
        });
    }
}

module.exports = WundergroundApiClient;