function validateItemName(name) {
  if (typeof name !== 'string') {
    return { valid: false, error: 'name must be a string' };
  }

  const normalized = name.trim();
  if (!normalized) {
    return { valid: false, error: 'name is required' };
  }

  if (normalized.length > 120) {
    return { valid: false, error: 'name must have at most 120 characters' };
  }

  return { valid: true, value: normalized };
}

module.exports = {
  validateItemName
};
