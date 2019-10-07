const MODULE = require('../module');

describe('[Enum Module]', () => {
  it('should have two-way declaration', () => {
    const value = MODULE[0];
    expect(MODULE[value]).toEqual(0);
  });

  it('should have a even number of elements', () => {
    const size = Object.keys(MODULE).length;
    expect(size % 2).toEqual(0);
  });
});
