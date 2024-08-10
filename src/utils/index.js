const tryCatch = (success, error) => {
    return new Promise((resolve, reject) => {
        if (success) {
            return resolve(success);
        } else {
            return reject(error);
        }
    });
}