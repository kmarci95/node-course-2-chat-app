var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
    it('should generate correct message object', () => {
        var from = 'Jon';
        var text = 'some message';
        var message = generateMessage(from,text);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });
});

describe('generate location', () => {
    it('should generate correct location object', () => {
        var from = 'dev';
        var lat = 15;
        var long = 90;
        var url = 'https://www.google.com/maps?q=15,90';
        var message = generateLocationMessage(from,lat,long);
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            url
        });
    })
})


