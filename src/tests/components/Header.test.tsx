import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Header } from '../../components/Header';
import { OrderProvider } from '../../hooks/useOrderContext';
import { GetCurrentOrderDocument } from '../../graphql/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';

const getCurrentOrderMock: MockedResponse = {
  request: {
    query: GetCurrentOrderDocument,
  },
  result: {
    data: {
      activeOrder: {
        id: '1',
        code: 'ORDER1',
        state: 'Active',
        total: 100,
        lines: [
          {
            id: '1',
            quantity: 1,
            featuredAsset: {
              preview: 'https://example.com/test.jpg',
            },
            productVariant: {
              id: '1',
              name: 'Test Product',
              price: 100,
            },
          },
        ],
      },
    },
  },
};

describe('Header', () => {
  it('renders without crashing', () => {
    const { getByAltText } = render(
      <MockedProvider mocks={[getCurrentOrderMock]} addTypename={false}>
        <OrderProvider>
          <Header />
        </OrderProvider>
      </MockedProvider>
    );
    expect(getByAltText('logo')).toBeInTheDocument();
  });

  it('displays the total price', async () => {
    const { getByText } = render(
      <MockedProvider mocks={[getCurrentOrderMock]} addTypename={false}>
        <OrderProvider>
          <Header />
        </OrderProvider>
      </MockedProvider>
    );
    await waitFor(() => getByText('$ 100'));
    expect(getByText('$ 100')).toBeInTheDocument();
  });
});
