'use strict';

class Skill {
    constructor(context, request) {
        this.context = context;
        this.request = request;
    }

    execute() {
    }

    buildSpeechletResponse(outputText, shouldEndSession, isSSML, repromptSpeech) {
      let resp = {
        outputSpeech: {
            type: "PlainText",
            text: outputText
        },
        shouldEndSession: shouldEndSession
      }
      // usage: user does not say anything that maps to an intent defined in
      // your voice interface while the audio stream is open
      if (repromptSpeech) {
        resp.reprompt = {
          outputSpeech: {
              type: "PlainText",
              text: repromptSpeech
          }
        }
        resp.shouldEndSession = false;
      }
      if (isSSML) {
        resp.outputSpeech.type = "SSML";
        resp.outputSpeech.ssml = `<speak>${resp.outputSpeech.text}</speak>`;
      }
      return resp;
    }

    generateResponse(speechletResponse, sessionAttributes) {
        return {
            version: "1.0",
            sessionAttributes: sessionAttributes,
            response: speechletResponse
        }
    }
}

module.exports = Skill;