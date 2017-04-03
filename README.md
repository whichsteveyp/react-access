# react-access
React Context driven role-access for conditional rendering of components.

## Quick Start
`npm i react-access` or `yarn add react-access`

```js
import RequireForAccess, {ReactAccessContext} from 'react-access';
import {MyApp, AdminMenuBar} from './my-app';

// you can hydrate these to your app however you'd like on initial page load
// or in your bundle, etc
const userPermissions = ['APPUSER', 'CREATE', 'EDIT', 'ETC'];

React.render(<ReactAccessContext userPermissions={userPermissions}>
  <RequireForAccess
    permissions={['ADMIN']}
    invalidAccessComponent={<span>You do not have admin access!</span>}
  >
    {/* This will not render for our userPermissions we've provided */}
    <AdminMenuBar/>
  </RequireForAccess>
  <MyApp>
</ReactAccessContext>, document.getElementById('react-app'));
```

### Why could I use this?
This library is intended to help with permission based rendering of UI
elements. This should really always be enforced on your service layers,
and through other secure measures as well - however often it can be
useful to re-use certain pages & components for varying levels of permission.
For example, perhaps an admin is given `CAN_DELETE_ANYTHING` permissions,
but users are only given `CAN_VIEW` and `CAN_CREATE`. Your menu may render
an option for deleting, but only for someone with the right permission set.

### Why should I not use this?
This library utilizes the React context API. This can add a few
considerations for use in your project:
1. React folks like to say you shouldn't use context because it can/will
change and is experimental. If it breaks, updating your app to newer
versions may have more things to fix than you expected.
1. Sometimes context is not the ideal solution, you're adding in extra
`<JSX/>` which is _not_ just a function call and may cause performance
issues in really large / high performing apps. It might be easier to do
something more like:
```js
const Component = (props) => {
  return <div>
    {hasAccess(props.userPermissions) && <SecretElement/>}
  </div>;
};
```

This library is more concerned with solving how you pass `hasAccess` and
`userPermissions` all the way down your application tree to leaf nodes.

## API
This components used in tandem to accomplish what we're aiming for are:
1. `<ReactAccessContext>`, which is a context provider designed to be
the single point of entry for your user data for all (or a section) of
your application.
2. `<RequireForAccess>`, which is a component that leverages that context
and determines if the contents should render.

### <ReactAccessContext> Props
| Name | Required | Description |
|------|-------------|----------|
|children | Yes | Any valid-to-render React Children (usually your app, or a section of it) |
|userPermissions | Yes | An array of permission strings the current user has (usually from session/server data) |
|validator | No | You may override the default validation with your own by passing a function which will be invoked with the signature `validator(userPermissions, requiredPermissions, requireAll)` |

### <RequireForAccess> Props
| Name | Required | Description |
|------|-------------|----------|
|children | Yes | Any valid-to-render React Children you wish to be rendered if access is granted |
|permissions | Yes | An array of permission strings this component requires in order to grant access |
|invalidAccessComponent | No | Any valid-to-render React Children you wish to be rendered if access is *not* granted |
| requireAll | No | A boolean value passed to `validator` that is *not* implemented in the default method |

## this is not quite ready
But, I'm using it anyway. And I plan to polish it up for better, more stable
production use. Feedback welcome!
