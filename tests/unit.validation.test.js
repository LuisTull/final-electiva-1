const { validateItemName } = require('../src/validation');

describe('validateItemName', () => {
  test('returns valid for proper string', () => {
    const result = validateItemName(' Item 1 ');
    expect(result.valid).toBe(true);
    expect(result.value).toBe('Item 1');
  });

  test('returns invalid for empty string', () => {
    const result = validateItemName('   ');
    expect(result.valid).toBe(false);
  });

  test('returns invalid for non-string', () => {
    const result = validateItemName(123);
    expect(result.valid).toBe(false);
  });
});
