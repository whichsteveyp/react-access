module.exports = function(root) {
  root = root ? root : global;
  root.expect = root.chai.expect;

  beforeEach(() => {
    // Using these globally-available Sinon features is preferrable, as they're
    // automatically restored for you in the subsequent `afterEach`
    root.sandbox = root.sinon.sandbox.create();
    root.stub = root.sandbox.stub.bind(root.sandbox);
  });

  afterEach(() => {
    delete root.stub;
    delete root.spy;
    root.sandbox.restore();
  });
};
