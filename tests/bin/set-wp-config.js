#!/usr/bin/env node

const fs = require('fs');

const path = `${process.cwd()}/.wp-env.json`;

let config;
if (fs.existsSync(path)) {
	config = JSON.parse(fs.readFileSync(path, 'utf-8'));
} else {
	config = { plugins: ['.', 'https://downloads.wordpress.org/plugin/classic-editor.zip'] };
}

const args = {};
process.argv.slice(2).forEach((arg) => {
	if (arg.startsWith('--')) {
		const [paramName, paramValue = true] = arg.slice(2).split('=');
		args[paramName] = paramValue;
	}
});

if (!args.core && !args.plugins) {
	process.exit();
}

if (args.core === 'latest') {
	delete args.core;
}

if (Object.keys(args).length === 0) {
	process.exit();
}

if (args.plugins) {
	args.plugins = args.plugins.split(',');
}

config = {
	...config,
	...args,
};

try {
	fs.writeFileSync(path, JSON.stringify(config));
} catch (err) {
	console.error(err);
}
