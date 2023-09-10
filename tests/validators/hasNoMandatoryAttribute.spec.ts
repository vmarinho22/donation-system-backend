import hasNoMandatoryAttribute from '../../src/validators/hasNoMandatoryAttribute';

describe('hasNoMandatoryAttribute', () => {

  it.each([
    ['return string if one attribute is missing', ['a', 'b', 'c'], { a: 'a', b: 'b' }, "c"],
    ['return string if all attributes are missing', ['a', 'b', 'c'], {}, "a"],
    ['return null if all are present', ['a', 'b', 'c'], { a: 'a',b: 'b', c: 'c', }, null],
  ])(`should %s`, (_, attributes, body, expected) => {
    const result = hasNoMandatoryAttribute(attributes, body);

    expect(result).toBe(expected);
  });
});