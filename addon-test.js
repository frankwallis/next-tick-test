var addon = require("./addon");

describe('API', () => {
	it('outputs hello world', (done) => {
 		addon.callAddon()
			.then((msg) => {
				console.log('in then');
				console.log("got " + msg);
				done();
			})
			.catch((err) => {
				console.log('in catch');
				done.fail(err);
			});
	});
});
