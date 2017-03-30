import {Component, PropTypes} from 'react';
import intersection from 'lodash/intersection';

export default class ReactAccessContext extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    userPermissions: PropTypes.arrayOf(PropTypes.string),
    validator: PropTypes.func,
  }

  render() {
    return this.props.children;
  }

  getChildContext = () => ({
    authorizeAccess: this.authorizeAccess
  })

  authorizeAccess = (requiredPermissions, requireAll) => {
    const {userPermissions, validator} = this.props;
    return validator(userPermissions, requiredPermissions, requireAll);
  }

  static childContextTypes = {
    authorizeAccess: PropTypes.func,
  }

  static defaultProps = {
    validator(userPermissions, requiredPermissions, requireAll) {
      if (requireAll === true) {
        // TODO: userPermissions contains all requiredPermissions
        // return
      } else {
        // by default we will authorize access if any of the permissions in
        // requiredPermissions match any userPermissions
        // TODO: is there a smaller comparision function we can use to reduce
        // bundle size and drop a dependency?
        return intersection(userCapabilities, requiredRoles).length > 1;
      }
    },
    userPermissions: [],
  }
}
