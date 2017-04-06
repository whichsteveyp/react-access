import React from 'react';
import {shallow} from 'enzyme';
import RequireForAccess from '../../src';

describe('RequireForAccess', function() {
  describe('rendering', () => {
    it('should render the provided children when authorizeAccess() is true', () => {
      const wrapper = shallow(<RequireForAccess>
        <div className="secret-stuff"/>
        <div className="secret-stuff2"/>
      </RequireForAccess>, {context: {authorizeAccess() {return true;}}});

      // we render a wrapper component in order to allow folks to be able to
      // pass siblings as children and still have them all render
      assert(wrapper.find('.react-access-valid').length === 1);

      // we should also expect to see all the content provided as children
      assert(wrapper.find('.secret-stuff').length === 1);
      assert(wrapper.find('.secret-stuff2').length === 1);
    });

    it('should not render the provided content when authorizeAccess() is false', () => {
      const wrapper = shallow(<RequireForAccess>
        <div className="secret-stuff"/>
        <div className="secret-stuff2"/>
      </RequireForAccess>, {context: {authorizeAccess() {return false;}}});

      // we render a wrapper component in order to allow folks to be able to
      // pass siblings as children and still have them all render
      assert(wrapper.find('.react-access-invalid').length === 1);

      // we should also expect to see all the content provided as children
      assert(wrapper.find('.secret-stuff').length === 0);
      assert(wrapper.find('.secret-stuff2').length === 0);
    });

    it('should render the invalidAccessComponent when provided', () => {
      const invalid = <span>You don't have access</span>;
      const wrapper = shallow(<RequireForAccess invalidAccessComponent={invalid}>
        <div className="secret-stuff"/>
        <div className="secret-stuff2"/>
      </RequireForAccess>, {context: {authorizeAccess() {return false;}}});

      // we render a wrapper component in order to allow folks to be able to
      // pass siblings as children and still have them all render
      assert(wrapper.find('.react-access-invalid').length === 1);

      // we should also expect to see an invalid node if we provide something
      assert(wrapper.find(invalid));
    });
  });
});
