var addon = require("./addon");
var intervalId;

// this fixes it
// intervalId = setInterval(function() {
// 	console.log(".");
// }, 100);

setTimeout(function() {
	console.log('timed out')
	
	if (intervalId) 
		clearInterval(intervalId);
}, 5000);

addon.callAddon(function() {
	console.log('after tick');
})
