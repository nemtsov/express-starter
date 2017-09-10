const defaultConfig = {
  PORT: 4000,
  GITHUB_API_URL: 'https://api.github.com',
};

/**
 * The reason for the config service is testing.
 * It is much easier to substitute a method than
 * it is to ensure that the process.env doesn't get
 * polluted from one test-run to another.
 *
 * Suggestions are welcome.
 */

module.exports = {
  get: (name) => process.env[name] || defaultConfig[name]
};
