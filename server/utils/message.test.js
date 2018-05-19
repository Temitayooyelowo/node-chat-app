const expect = require('expect');

const {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Zarsha';
    let latitude = 1233333;
    let longitude = 99983223;

    let message = generateLocationMessage(from, latitude, longitude);

    expect(message).toMatchObject({
      from: from,
      url: `https://www.google.com/maps?q=${latitude},${longitude}`
    });
    expect(typeof message.createdAt).toBe('number');

  }); //synchronous test
});
