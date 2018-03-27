import React, {Children} from 'react';
import {mount} from 'enzyme';
import RequireForAccess, {ReactAccessProvider} from '../../src';

describe('RequireForAccess', function() {
  describe('rendering', () => {
    it('should render the provided children when authorizeAccess/validator() is true', () => {
      const wrapper = mount(<ReactAccessProvider validator={() => true}>
        <RequireForAccess>
          <div>
            <div className="secret-stuff"/>
            <div className="secret-stuff2"/>
          </div>
        </RequireForAccess>
      </ReactAccessProvider>);

      // we should expect to see all the content provided as children
      assert(wrapper.find('.secret-stuff').length === 1);
      assert(wrapper.find('.secret-stuff2').length === 1);
    });

    it('should not render the provided content when authorizeAccess() is false (default)', () => {
      const wrapper = mount(<RequireForAccess>
        <div>
          <div className="secret-stuff"/>
          <div className="secret-stuff2"/>
        </div>
      </RequireForAccess>);

      // we should also expect to see all the content provided as children
      assert(wrapper.find('.secret-stuff').length === 0);
      assert(wrapper.find('.secret-stuff2').length === 0);
    });

    it('should render the invalidAccessComponent when provided', () => {
      const invalid = <span>You don't have access</span>;
      const wrapper = mount(<RequireForAccess invalidAccessComponent={invalid}>
        <div>
          <div className="secret-stuff"/>
          <div className="secret-stuff2"/>
        </div>
      </RequireForAccess>);

      // we should expect to see an invalid node if we provide something
      assert(wrapper.find(invalid));
    });
  });
});
