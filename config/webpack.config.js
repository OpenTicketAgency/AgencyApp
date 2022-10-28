
var path = require('path');

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname,'../docs/lib'),
		filename: 'OpenTicketAgency.dev.js',
		library: 'OpenTicketAgency',
		libraryTarget: 'window',
		globalObject: 'window'
	}
};
