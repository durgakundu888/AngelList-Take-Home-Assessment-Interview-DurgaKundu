// setupJest.js
const jsdomGlobal = require('jsdom-global');

const dom = jsdomGlobal('<!doctype html><html><body></body></html>');

// Ensure that Jest does not complain about requestAnimationFrame
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};

// Ensure that Jest does not complain about localStorage
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  },
  writable: true,
});
global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
