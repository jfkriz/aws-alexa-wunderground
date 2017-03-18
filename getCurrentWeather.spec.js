import getCurrentWeather from 'getCurrentWeather';

describe('getCurrentWeather', function() {
    let fixture = getcurrentWeather;

    it('should get the current weather', function() {
        let response = fixture();
        expect(response).toBeDefined();
        expect(response.error).toBeDefined();
        expect(response.error).toBeFalsy();
        expect(response.text).toBeDefined();
        expect(response.text.length > 0).toBeTruthy();
    })
})