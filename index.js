var addon = require("./addon");

// this fixes it
// setInterval(function() {
// 	console.log(".");
// }, 1);

setTimeout(function() {
	console.log('timed out')
}, 5000);

addon.callAddon(function() {
	console.log('after tick');
})
