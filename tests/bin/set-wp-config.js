#!/usr/bin/env node

const fs = require('fs');
const { exit } = require('process');
const path = require('path'); // Use path for file paths

const configPath = path.join(process.cwd(), '.wp-env.override.json');
let config = {};

if (fs.existsSync(configPath)) {
	// Avoid dynamic require; use fs.readFileSync and JSON.parse instead
	const fileContent = fs.readFileSync(configPath, 'utf8');
	config = JSON.parse(fileContent);
}

const args = process.argv.slice(2);

if (args.length === 0) exit(0);

if (args[0] === 'latest') {
	if (fs.existsSync(configPath)) {
		fs.unlinkSync(configPath);
	}
	exit(0);
}

config.core = args[0];

if (!config.core.match(/^WordPress\/WordPress#/)) {
	config.core = `WordPress/WordPress#${config.core}`;
}

try {
	fs.writeFileSync(configPath, JSON.stringify(config, null, 2)); // Added indentation for prettier
} catch (err) {
	// eslint-disable-next-line no-console
	console.error(err);
}
