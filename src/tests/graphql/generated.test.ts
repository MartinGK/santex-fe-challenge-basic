import { getSdk } from '../../graphql/generated';
import { GraphQLClient } from 'graphql-request';

describe('getSdk', () => {
  it('calls the client request method with correct arguments', () => {
    const mockClient = {
      request: jest.fn(),
    } as unknown as GraphQLClient;

    const sdk = getSdk(mockClient);

    const variables = { productId: '1', quantity: 1 };
    const headers = { someHeader: 'someHeaderValue' };

    sdk.AddItemToOrder(variables, headers);
    expect(mockClient.request).toHaveBeenCalledWith(
      expect.any(Object),
      variables,
      headers
    );

    sdk.GetProducts({}, headers);
    expect(mockClient.request).toHaveBeenCalledWith(
      expect.any(Object),
      {},
      headers
    );

    sdk.GetCurrentOrder({}, headers);
    expect(mockClient.request).toHaveBeenCalledWith(
      expect.any(Object),
      {},
      headers
    );
  });
});
