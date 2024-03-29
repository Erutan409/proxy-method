const Assert = require('assert');
const Restore = require('./Restore');

/**
 * Proxy object methods.
 */
class Proxy {

    /**
     * Proxy an object method before it executes.
     *
     * @param {Object} obj
     * @param {String} method
     * @param {Function} callable
     * @param {Boolean} spread_callback
     * @param {Function|null} done
     * @return {Restore}
     */
    static before(obj, method, callable, spread_callback = false, done = null) {

        Assert(typeof obj === 'object', 'Expecting valid object.');
        Assert(typeof method === 'string', 'Expecting valid method string.');
        Assert(typeof callable === 'function', 'Expecting valid callback.');
        Assert(typeof obj[method] === 'function', `No valid method: ${method}`);

        const orig = obj[method];

        obj[method] = (...args) => {

            if (Boolean(spread_callback)) {
                args = [].concat(callable(...args));
            } else {
                callable(...args);
            }

            const result = orig.apply(obj, args);

            if (typeof done === 'function') {
                done(result, args, obj);
            }

            return result;

        };

        return new Restore(obj, method, orig);

    }

    /**
     * Proxy an object method after it executes.
     *
     * @param {Object} obj
     * @param {String} method
     * @param {Function} callable
     * @param {Boolean} pass_callback
     * @return {Restore}
     */
    static after(obj, method, callable, pass_callback = false) {

        Assert(typeof obj === 'object', 'Expecting valid object.');
        Assert(typeof method === 'string', 'Expecting valid method string.');
        Assert(typeof callable === 'function', 'Expecting valid callback.');
        Assert(typeof obj[method] === 'function', `No valid method: ${method}`);

        const orig = obj[method];

        obj[method] = (...args) => {

            let result = orig.apply(obj, args);
            let called_result = callable(result, args, obj);

            return Boolean(pass_callback) ? called_result : result;

        };

        return new Restore(obj, method, orig);

    }

}

module.exports = Proxy;