import React, {Component} from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash/intersection';
import createReactContext from 'create-react-context';

// by default, our value is always a function that returns
// false for accessGranted
const AccessContext = createReactContext(() => false);

// This is provided for folks who want full-control of how
// `authorizeAccess` is invoked, without RequireForAccess
export const ReactAccessConsumer = AccessContext.Consumer;

export class ReactAccessProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    permissions: PropTypes.arrayOf(PropTypes.string),
    validator: PropTypes.func,
  }

  render() {
    const { children } = this.props;
    return <AccessContext.Provider value={this.authorizeAccess}>
      {children}
    </AccessContext.Provider>;
  }

  authorizeAccess = (requiredPermissions, requireAll) => {
    const {permissions, validator} = this.props;
    return validator(permissions, requiredPermissions, requireAll);
  }

  static defaultProps = {
    validator(permissions, requiredPermissions, requireAll) {
      if (requireAll === true) {
        // TODO: userPermissions contains all requiredPermissions
        // return
      } else {
        // by default we will authorize access if any of the permissions in
        // requiredPermissions match any userPermissions
        // TODO: is there a smaller comparision function we can use to reduce
        // bundle size and drop a dependency?
        return intersection(permissions, requiredPermissions).length > 0;
      }
    },
    permissions: [],
  }
}

export class RequireForAccess extends Component {
  static propTypes = {
    children: PropTypes.node,
    permissions: PropTypes.arrayOf(PropTypes.string),
    invalidAccessComponent: PropTypes.node,
    requireAll: PropTypes.bool,
  }

  render() {
    const {children, permissions, invalidAccessComponent, requireAll} = this.props;

    return <AccessContext.Consumer>
      {authorizeAccess => {
        const authorized = authorizeAccess(permissions, requireAll);
        return authorized ? children : invalidAccessComponent;
      }}
    </AccessContext.Consumer>;
  }

  static defaultProps = {
    invalidAccessComponent: null,
    requireAll: false,
  }
}

