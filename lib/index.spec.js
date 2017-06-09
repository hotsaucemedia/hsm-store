/* global describe, it */

var expect = require('chai').expect
var hsmStore = require('./index')

describe('hsm store', function () {
  it('should export a function', function () {
    expect(hsmStore).to.be.a('function')
  })
})
