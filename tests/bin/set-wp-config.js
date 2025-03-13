#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const configPath = path.join(process.cwd(), '.wp-env.json');

// Parse command line arguments
const args = {};
process.argv.slice(2).forEach((arg) => {
	if (arg.startsWith('--')) {
		const [paramName, paramValue = true] = arg.slice(2).split('=');
		args[paramName] = paramValue;
	}
});

// Exit if no relevant arguments provided
if (!args.core && !args.plugins) {
	process.exit(0);
}

// Handle 'latest' core version
if (args.core === 'latest') {
	delete args.core;
}

// Exit if no valid arguments after processing
if (Object.keys(args).length === 0) {
	process.exit(0);
}

// Convert plugins string to array if provided
if (args.plugins) {
	args.plugins = args.plugins.split(',');
}

// Read existing config or create new one
let config = {};
try {
	if (fs.existsSync(configPath)) {
		config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
	} else {
		config = { plugins: ['.'] };
	}
} catch (error) {
	console.error('Error reading wp-env config:', error);
	process.exit(1);
}

// Merge new arguments with existing config
config = {
	...config,
	...args,
};

// Write updated config
try {
	fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
	console.log('wp-env config updated successfully');
} catch (error) {
	console.error('Error writing wp-env config:', error);
	process.exit(1);
}
