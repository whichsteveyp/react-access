import React from 'react';
import {shallow} from 'enzyme';
import {ReactAccessContext, __get__} from '../../src';

describe('ReactAccessContext', function() {
  beforeEach(() => {
    this.defaultProps = {
      userPermissions: ['regularUser'],
    };
  });

  describe('rendering', () => {
    it('should render the provided children', () => {
      const wrapper = shallow(<ReactAccessContext {...this.defaultProps}>
        <span>App Code</span>
      </ReactAccessContext>);

      assert(wrapper.children().length === 1);
      assert(wrapper.contains(<span>App Code</span>));
    });

    it('should use the user provided validator to authorizeAccess with the expected arguments', () => {
      const validator = stub();
      const wrapper = shallow(<ReactAccessContext {...this.defaultProps} validator={validator}>
        <span>App Code</span>
      </ReactAccessContext>);

      const authorizeAccess = wrapper.instance().authorizeAccess;

      // this method is exposed via context, and takes two arguments.
      // it then provides the `validator` prop method with the userPermissions,
      // the requiredPermissions, and requireAll flag
      authorizeAccess(['edit'], false);

      assert(validator.calledOnce);
      assert(validator.calledWith(this.defaultProps.userPermissions, ['edit'], false));
    });

    it('should generically validate the userPermissions & requiredPermissions by default', () => {
      const wrapper = shallow(<ReactAccessContext {...this.defaultProps}>
        <span>App Code</span>
      </ReactAccessContext>);

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
