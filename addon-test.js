var addon = require("./addon");

describe('API', function() {
	it('outputs hello world', function(done) {
		addon.callAddon(function() {
			console.log('after next tick');
			done();
		});
	});
});
