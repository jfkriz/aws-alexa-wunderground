'use strict';

let Skill = require('./skills/skill');
let GetCurrentWeather = require('./skills/GetCurrentWeather');

exports.handler = (event, context) => {
    try {
        if (event.session.new) {
            console.log("NEW SESSION");
        }

        let c = eval(event.request.intent.name);
        let skill = new c(context, event.request);
        skill.execute();
    }
    catch(error) {
        context.fail(`Exception: ${error}`);
    }
}