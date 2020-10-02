module.exports = {
  testURL: 'http://47.99.201.87:8000',
  preset: 'jest-puppeteer',
  extraSetupFiles: ['./tests/setupTests.js'],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: false,
    localStorage: null,
  },
};
