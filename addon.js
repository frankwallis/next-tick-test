var addon = require('bindings')('addon').RunCallback;

module.exports.callAddon = function(callback) {
	addon(function(msg) {
		console.log("before next tick");
		process.nextTick(callback);
	});
}
