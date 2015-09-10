var addon = require('bindings')('addon').RunCallback;

// this fixes it
// setInterval(function() {
// 	console.log(".");
// }, 1);

module.exports.callAddon = function(callback) {
	addon(function(msg) {
		console.log("before next tick");
		process.nextTick(callback.bind(null, msg));
	});
}
