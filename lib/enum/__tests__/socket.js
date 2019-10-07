const SOCKET = require('../socket');

describe('[Enum Socket]', () => {
  it('should have two-way declaration', () => {
    const value = SOCKET[0];
    expect(SOCKET[value]).toEqual(0);
  });

  it('should have a even number of elements', () => {
    const size = Object.keys(SOCKET).length;
    expect(size % 2).toEqual(0);
  });
});
