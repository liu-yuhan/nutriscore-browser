var assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
    it('should return +3 when the value is present in 4th position', function(){
        assert.equal(+3, [1,2,3,4].indexOf(4));
      });
  });
});