import { configure } from 'enzyme';

// enzyme requires special adapters now that are in different modules
// as opposed to different imports, so we need to configure it based on
// which React version we're testing
if (process.env.REACT_VERSION === '^15.4.0') {
  const Adapter = require('enzyme-adapter-react-15.4');
  configure({ adapter: new Adapter() });
} else if (process.env.REACT_VERSION === '<15.4.0 >15.0.0') {
  const Adapter = require('enzyme-adapter-react-15');
  configure({ adapter: new Adapter() });
} else {
  const Adapter = require('enzyme-adapter-react-16');
  configure({ adapter: new Adapter() });
}

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
