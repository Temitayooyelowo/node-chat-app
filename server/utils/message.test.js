const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {

    let from = 'Zarsha';
    let text = 'Hello!';
    let message = generateMessage(from, text);

    expect(message).toMatchObject({
      from: from,
      text: text
    });
    expect(typeof message.createdAt).toBe('number');
  });
});
