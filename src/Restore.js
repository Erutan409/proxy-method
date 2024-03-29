/**
 * Restore handle for proxied method.
 */
class Restore {

    /**
     * Constructor.
     *
     * @param {Object} object
     * @param {String} method
     * @param {Function} original
     */
    constructor(object, method, original) {

        this.original = original;
        this.method = method;
        this.object = object;
        this.restored = false;

    }

    /**
     * Restore the object instance's method to its original functionality without the proxy.
     *
     * @returns {Boolean}
     */
    restore() {

        if (this.restored) {

            console.warn(`The ${this.method} has already been restored for ${this.object.constructor.name}.`);

            return false;

        }

        this.object[this.method] = this.original;
        this.restored = true;

        return true;

    }

}

module.exports = Restore;