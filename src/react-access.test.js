import React from 'react';
import {render} from 'react-testing-library';
import 'jest-dom/extend-expect';
import { RequireForAccess, ReactAccessProvider, ReactAccessConsumer } from './index';

test('renders children when authorizeAccess is true', () => {
  const {getByTestId} = render(<ReactAccessProvider validator={() => true}>
    <RequireForAccess>
      <div data-testid="expected">Expected Content</div>
    </RequireForAccess>
  </ReactAccessProvider>);

  expect(getByTestId('expected')).toHaveTextContent('Expected Content');
});

test('renders invalidAccessComponent when validator is false', () => {
  const invalidAccessComponent = <div data-testid="invalid">Invalid Access</div>;
  const {getByTestId, queryByText} = render(<ReactAccessProvider validator={() => false}>
    <RequireForAccess invalidAccessComponent={invalidAccessComponent}>
      <div data-testid="secret">Secret Content</div>
    </RequireForAccess>
  </ReactAccessProvider>);

  expect(getByTestId('invalid')).toHaveTextContent('Invalid Access');
  expect(queryByText('Secret Content')).toBeNull();
});



