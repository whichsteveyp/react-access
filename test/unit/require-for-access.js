import React, {Children} from 'react';
import {shallow} from 'enzyme';
import RequireForAccess from '../../src';

describe('RequireForAccess', function() {
  describe('rendering', () => {
    it('should render the provided children when authorizeAccess() is true', () => {
      const wrapper = shallow(<RequireForAccess>
        <div>
          <div className="secret-stuff"/>
          <div className="secret-stuff2"/>
        </div>
      </RequireForAccess>, {context: {authorizeAccess() {return true;}}});

      // we should expect to see all the content provided as children
      assert(wrapper.find('.secret-stuff').length === 1);
      assert(wrapper.find('.secret-stuff2').length === 1);
    });

    it('should not render the provided content when authorizeAccess() is false', () => {
      const wrapper = shallow(<RequireForAccess>
        <div>
          <div className="secret-stuff"/>
          <div className="secret-stuff2"/>
        </div>
      </RequireForAccess>, {context: {authorizeAccess() {return false;}}});

      // we should also expect to see all the content provided as children
      assert(wrapper.find('.secret-stuff').length === 0);
      assert(wrapper.find('.secret-stuff2').length === 0);
    });

    it('should render the invalidAccessComponent when provided', () => {
      const invalid = <span>You don't have access</span>;
      const wrapper = shallow(<RequireForAccess invalidAccessComponent={invalid}>
        <div>
          <div className="secret-stuff"/>
          <div className="secret-stuff2"/>
        </div>
      </RequireForAccess>, {context: {authorizeAccess() {return false;}}});

      // we should expect to see an invalid node if we provide something
      assert(wrapper.find(invalid));
    });
  });

  describe('api', () => {
    beforeEach(() => {
      this.ChildrenOnly = Children.only;
      Children.only = stub();
      // this is to ensure React doesn't complain during the actual render
      Children.only.returns(<div/>);
    });

    afterEach(() => {
      Children.only = this.childrenOnly;
    });

    it('should enforce a single child is provided with React.Children.only', () => {
      const wrapper = shallow(<RequireForAccess><div/></RequireForAccess>, {context: {authorizeAccess() {return true;}}});
      assert(Children.only.calledOnce);
    });
  });
});
