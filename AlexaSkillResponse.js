export default class AlexaSkillResponse {
    constructor() {
        this.version = 1.0;
        this.response = {
            outputSpeech: {
                type: 'PlainText',
                text: ''
            },
            shouldEndSession: true
        }
    }
}