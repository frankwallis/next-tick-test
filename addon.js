var addon = require('bindings')('addon').RunCallback;

// uncomment this to see it working
//var Promise = require('bluebird');

class Deferred {
	constructor() {
		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}
}

export function callAddon() {
	var deferred = new Deferred();

	addon((msg) => {
		console.log('in callback');
		deferred.resolve(msg);
	});

	return deferred.promise;
}

/*process.nextTick(() => {
	callAddon()
		.then((msg) => {
			console.log(msg);
		})
		.catch(() => {
			console.log('Error');
		})
});*/