import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { OrderProvider, useOrder } from '../../hooks/useOrderContext';
import {
  GetCurrentOrderDocument,
  AddItemToOrderDocument,
} from '../../graphql/generated';

function TestComponent() {
  const { order } = useOrder();

  return <div>{order ? 'Order exists' : 'No order'}</div>;
}

describe('OrderProvider', () => {
  it('provides order state', async () => {
    const mocks = [
      {
        request: {
          query: GetCurrentOrderDocument,
        },
        result: {
          data: {
            activeOrder: {
              id: '1',
              code: 'ORDER1',
              state: 'AddingItems',
              total: 1000,
              lines: [],
            },
          },
        },
      },
      {
        request: {
          query: AddItemToOrderDocument,
          variables: { productId: '1', quantity: 1 },
        },
        result: {
          data: {
            addItemToOrder: {
              id: '1',
            },
          },
        },
      },
    ];

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <OrderProvider>
          <TestComponent />
        </OrderProvider>
      </MockedProvider>
    );

    await waitFor(() => getByText('Order exists'));
  });
});
