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
    invalidAccessComponent={<span>You don't have admin access!</span>}
  >
    {/* This will not render for our userPermissions we've provided */}
    <AdminMenuBar/>
  </RequireForAccess>
  <MyApp>
</ReactAccessContext>, document.getElementById('react-app'));
```

## this is not quite ready
But, I'm using it anyway. And I plan to polish it up for better, more stable
production use. Feedback welcome!
