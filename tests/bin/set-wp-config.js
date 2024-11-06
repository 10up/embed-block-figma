#!/usr/bin/env node

const fs = require('fs');

const path = `${process.cwd()}/.wp-env.json`;

let config = fs.existsSync(path) ? require(path) : { plugins: ['.', 'https://downloads.wordpress.org/plugin/classic-editor.zip'] };

const args = {};
process.argv.slice(2, process.argv.length).forEach((arg) => {
	if (arg.slice(0, 2) === '--') {
		const param = arg.split('=');
		const paramName = param[0].slice(2, param[0].length);
		const paramValue = param.length > 1 ? param[1] : true;
		args[paramName] = paramValue;
	}
});

if (!args.core && !args.plugins) {
	process.exit(); // Exit instead of return
}

if (args.core === 'latest') {
	delete args.core;
}

if (Object.keys(args).length === 0) {
	process.exit(); // Exit instead of return
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
