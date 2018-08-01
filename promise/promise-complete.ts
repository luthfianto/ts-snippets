const promiseComplete = function (promises) {
    let completedPromises = 0;
    return new Promise(function (resolve, reject) {
        promises.forEach(function (promise, _index) {
            promise.then(function (_) {
                completedPromises += 1;
                if (completedPromises === promises.length) {
                    resolve(true);
                }
            }).catch(function (error) {
                reject(error);
            });
        });
    });
}
