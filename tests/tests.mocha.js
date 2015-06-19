var fs = require('fs');
var ttf2woff2 = require('../src/index');
var assert = require('assert');

describe('ttf2woff2', function() {

  it('should work', function(done) {
    this.timeout(5000);
    var inputContent = fs.readFileSync(__dirname + '/expected/iconsfont.ttf');
    assert.deepEqual(
      ttf2woff2(inputContent),
      fs.readFileSync(__dirname + '/expected/iconsfont.woff2')
    );
    done();
  });

});
