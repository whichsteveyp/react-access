import React, {Component, Children} from 'react';
import PropTypes from 'prop-types';

export default class RequireForAccess extends Component {
  static propTypes = {
    children: PropTypes.node,
    permissions: PropTypes.arrayOf(PropTypes.string),
    invalidAccessComponent: PropTypes.node,
    requireAll: PropTypes.bool,
  }

  static contextTypes = {
    authorizeAccess: PropTypes.func,
  }

  render() {
    const {children, permissions, invalidAccessComponent, requireAll} = this.props;
    const {authorizeAccess} = this.context;
    const pass = authorizeAccess(permissions, requireAll);

    return pass ? Children.only(children) : invalidAccessComponent;
  }

  static defaultProps = {
    invalidAccessComponent: null,
    requireAll: false,
  }
}
