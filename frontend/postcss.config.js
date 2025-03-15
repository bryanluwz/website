const path = require('path');

module.exports = {
	plugins: [
		require('postcss-import')({
			path: [path.resolve(__dirname, 'src')],
			plugins: [
				// This will automatically import theme.css at the top of every file
				require('postcss-import'),
				{
					resolve(id, basedir, importOptions) {
						if (id === 'theme.css') {
							return path.resolve(__dirname, 'src', 'theme.css');
						}
						return id;
					},
				},
			],
		}),
	],
};
