const config = {
	extends: ['@10up/stylelint-config'],
	rules: {
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true,
			},
		],
	},
};

module.exports = config;
