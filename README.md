<h1 align="center">
    Proxy JavaScript Methods
    <br>
    <a href="https://www.npmjs.com/package/proxy-method"><img src="https://img.shields.io/npm/v/proxy-method.svg?style=for-the-badge" alt="npm" /></a> <a href="https://www.npmjs.com/package/proxy-method"><img src="https://img.shields.io/npm/dt/proxy-method.svg?style=for-the-badge" alt="npm" /></a>
</h1>

Simple way of adding custom logic to an instantiated object's method(s).

## Installation

```bash
npm install proxy-method --save
```

## Usage

```javascript
const proxyMethod = require('proxy-method');

const instance = new class {

    print(message) {
        console.log(`This is your message: ${message}`);
    }

};

instance.print('This is a test.');

// prints: 'This is your message: This is a test.'

// proxy the method before it executes
var restore = proxyMethod.before(
    instance,
    'print',
    message => `${message.replace(/\.\s*$/, '')} - suffixed.`,
    true
);

instance.print('This is another test.');

// prints: 'This is your message: This is another test - suffixed.'

// removing previous proxied functionality
restore.restore();

proxyMethod.after(instance, 'print', () => console.log('Executing after proxied method.'));

instance.print('This is one more test.');

// prints:
// This is your message: This is one more test.
// Executing after proxied method.
```