const { defineConfig } = require('cypress');
const path = require('path');

module.exports = defineConfig({
	chromeWebSecurity: false,
	fixturesFolder: 'tests/cypress/fixtures',
	screenshotsFolder: 'tests/cypress/screenshots',
	videosFolder: 'tests/cypress/videos',
	downloadsFolder: 'tests/cypress/downloads',
	video: true,
	reporter: 'mochawesome',
	reporterOptions: {
		mochaFile: 'mochawesome-[name]',
		reportDir: path.join(__dirname, 'reports'),
		overwrite: false,
		html: false,
		json: true,
	},
	e2e: {
		specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
		supportFile: 'tests/cypress/support/index.js',
	},
});
