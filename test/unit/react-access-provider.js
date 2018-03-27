import React from 'react';
import {shallow} from 'enzyme';
import {ReactAccessProvider} from '../../src';

describe('ReactAccessProvider', function() {
  beforeEach(() => {
    this.defaultProps = {
      permissions: ['regularUser'],
    };
  });

  describe('rendering', () => {
    it('should render the provided children', () => {
      const wrapper = shallow(<ReactAccessProvider {...this.defaultProps}>
        <span>App Code</span>
      </ReactAccessProvider>);

      assert(wrapper.children().length === 1);
      assert(wrapper.contains(<span>App Code</span>));
    });

    it('should use the user provided validator to authorizeAccess with the expected arguments', () => {
      const validator = stub();
      const wrapper = shallow(<ReactAccessProvider {...this.defaultProps} validator={validator}>
        <span>App Code</span>
      </ReactAccessProvider>);

      const authorizeAccess = wrapper.instance().authorizeAccess;

      // this method is exposed via context, and takes two arguments.
      // it then provides the `validator` prop method with the permissions,
      // the requiredPermissions, and requireAll flag
      authorizeAccess(['edit'], false);

      assert(validator.calledOnce);
      assert(validator.calledWith(this.defaultProps.permissions, ['edit'], false));
    });

    it('should generically validate the permissions & requiredPermissions by default', () => {
      const wrapper = shallow(<ReactAccessProvider {...this.defaultProps}>
        <span>App Code</span>
      </ReactAccessProvider>);

      // default props are not available on wrapper.prop() or wrapper.props()
      // so we need an instance before we can access it
      const validator = wrapper.instance().props.validator;

      // assert that when a required permission is present, access is authorized
      const userWithAllowedPermissions = ['edit', 'delete', 'read'];
      const userWithDeniedPermissions = ['edit', 'read'];
      const requiredPermissions = ['delete'];

      assert(validator(userWithAllowedPermissions, requiredPermissions))
      assert(!validator(userWithDeniedPermissions, requiredPermissions))
    });
  });
});
