var expect = require('expect');

var {generateMessage} = require('./message');

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


