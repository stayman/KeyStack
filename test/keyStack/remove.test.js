var createElement = require('../mocks/fakeComponent');
var keyStack = require('../../lib/keyStack');

var stack = keyStack.stack;
var remove = keyStack.remove;

describe('keyStack.remove', function() {

  beforeEach(function() {
    this.spy = sinon.spy(Array.prototype, 'splice');
    this.listenerSpy = sinon.spy(document, 'removeEventListener');
    this.elm = createElement({});
  });

  afterEach(function() {
    this.listenerSpy.restore();
    this.spy.restore();
  });

  after(function() {
    delete this.elm;
  })

  it('should remove the element from the stack', function() {
    stack(this.elm);
    remove(this.elm);
    expect(this.spy).to.have.been.calledWith(0, 1);
  });

  it('should remove the listener if the stack is empty', function() {
    stack(this.elm);
    remove(this.elm);
    expect(this.listenerSpy).to.have.beenCalled;
  });

  it('should not remove the listener if there is something remaining in the stack', function() {
    var x = {};
    stack(this.elm);
    stack(x);
    remove(x);
    expect(this.listenerSpy).not.to.have.beenCalled;
    remove(this.elm); // do this to ensure cleanup for future specs
  });

});
