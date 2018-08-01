const promiseLast = function (promises) {
    let completedPromises = 0;
    return new Promise(function (resolve, reject) {
        promises.forEach(function (promise, _index) {
            promise.then(function (value) {
                completedPromises += 1;
                if (completedPromises === promises.length) {
                    resolve(value);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    });
}
