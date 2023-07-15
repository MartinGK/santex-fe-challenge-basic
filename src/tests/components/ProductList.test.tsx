import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { ProductList } from '../../components/ProductList';
import {
  GetProductsDocument,
  GetProductsQuery,
  GetCurrentOrderDocument,
  AddItemToOrderDocument,
  ErrorResult,
} from '../../graphql/generated';
import { useOrder, OrderProvider } from '../../hooks/useOrderContext';
import '@testing-library/jest-dom';

test('renders ProductList', async () => {
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

  const productMock: MockedResponse<GetProductsQuery> = {
    request: {
      query: GetProductsDocument,
    },
    result: {
      data: {
        products: {
          items: [
            {
              id: '1',
              name: 'Test Product',
              description: 'This is a test product',
              featuredAsset: { preview: 'https://example.com/test.jpg' },
              variants: [
                { price: 100, priceWithTax: 120, __typename: 'ProductVariant' },
              ],
              __typename: 'Product',
            },
          ],
          __typename: 'ProductList',
        },
      },
    },
  };

  const addItemToOrderMock: MockedResponse = {
    request: {
      query: AddItemToOrderDocument,
      variables: {
        productId: '1',
        quantity: 1,
      },
    },
    result: {
      data: {
        addItemToOrder: {
          __typename: 'Order',
        },
      },
    },
  };
  const { getByText, getByAltText } = render(
    <MockedProvider
      mocks={[productMock, getCurrentOrderMock, addItemToOrderMock]}
      addTypename={false}
    >
      <OrderProvider>
        <ProductList />
      </OrderProvider>
    </MockedProvider>
  );

  // Verifies that the "Loading..." message is displayed
  expect(getByText('Loading...')).toBeInTheDocument();

  // Waits until the product is loaded
  await waitFor(() => getByText('Test Product'));

  // Verifies that the product is displayed correctly
  expect(getByText('Test Product')).toBeInTheDocument();
  expect(getByText('This is a test product')).toBeInTheDocument();
  expect(getByText('Price: $100')).toBeInTheDocument();
  expect(getByAltText('Test Product')).toBeInTheDocument();

  // Verifies the interaction with the buy button
  const buyButton = getByText('Buy');
  userEvent.click(buyButton);
  // Wait for the addItemToOrder mutation to be called
  await waitFor(() => {
    expect(addItemToOrderMock?.result).toBeDefined();
  });
});

test('renders ProductList error', async () => {
  const productMock: MockedResponse = {
    request: {
      query: GetProductsDocument,
    },
    error: new Error("Your error message here"),
  };

  const { getByText } = render(
    <MockedProvider mocks={[productMock]} addTypename={false}>
      <OrderProvider>
        <ProductList />
      </OrderProvider>
    </MockedProvider>
  );

  // Verifies that the "Loading..." message is displayed
  expect(getByText('Loading...')).toBeInTheDocument();

  // Waits until the error is received
  await waitFor(() => getByText('Error :('));

  // Verifies that the error is displayed correctly
  expect(getByText('Error :(')).toBeInTheDocument();
});
