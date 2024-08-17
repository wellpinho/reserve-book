const tryCatch = (promise) => {
    return promise
        .then(data => [data]
    ).catch(err => [err]);
}

module.exports = { tryCatch };