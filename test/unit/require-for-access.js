import React from 'react';
import {shallow} from 'enzyme';
import RequireForAccess, {__get__} from '../../src';

describe('RequireForAccess', function() {
  beforeEach(() => {
    // this.defaultProps = {
    //   title: 'Modal',
    //   children: 'Foo'
    // };
  });

  describe('rendering', () => {
    beforeEach(() => {
      // this.preventScroll = __get__('preventScroll');
      // this.preventScroll.on = stub();
      // this.preventScroll.off = stub();
    });

    it('should render the provided children when authorizeAccess() is true');
    it('should not render the provided content when authorizeAccess() is false');
    it('should render the invalidAccessComponent when provided');
  });
});
