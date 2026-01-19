/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const path = require('path');

// Resolve the package directory
const wpEnvPackagePath = require.resolve('@wordpress/env/package.json');
const wpEnvLibPath = path.join(path.dirname(wpEnvPackagePath), 'lib');

// Directly require the files using their resolved paths
// eslint-disable-next-line import/no-dynamic-require
const { loadConfig } = require(path.join(wpEnvLibPath, 'config', 'index.js'));
// eslint-disable-next-line import/no-dynamic-require
const getCacheDirectory = require(path.join(wpEnvLibPath, 'config', 'get-cache-directory.js'));

/**
 * Update the config to include the base url defined by WP-Env.
 *
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = async (on, config) => {
	const cacheDirectory = await getCacheDirectory();
	const wpEnvConfig = await loadConfig(cacheDirectory);

	if (wpEnvConfig) {
		const port = wpEnvConfig.env.tests.port || null;

		if (port) {
			config.baseUrl = wpEnvConfig.env.tests.config.WP_SITEURL;
		}
	}

	return config;
};
