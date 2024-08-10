/**
* @description: Atenção, esta classe não pode ser instanciada, use os métodos definidos nela. Right e Left
*/

module.exports = class Either {
    constructor(error, success) {
        this.error = error;
        this.success = success;
    }

    static error(error) {
        return new Either(error, null);
    }

    static success(success) {
        return new Either(null, success);
    }

    static userExists(value) {
        return { message: `${value} already exists`}
    }
}