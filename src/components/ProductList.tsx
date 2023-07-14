//Implement a home page with a grid of products that includes product picture,
//description and price (from any product variant). Hint: use Graphql query.

import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  GetProductsDocument,
  AddItemToOrderDocument,
  GetProductsQuery,
  AddItemToOrderMutation,
  GetCurrentOrderQuery,
  GetCurrentOrderDocument
} from '../graphql/generated';
import {
  ProductsGrid,
  Product,
  ProductPicture,
  ProductDescription,
  ProductPrice,
  ProductName,
  BuyButton,
} from './styled/ProductsList';

export function ProductList() {
  const { loading, error, data } = useQuery<GetProductsQuery>(
    GetProductsDocument
  );
  const { data: orderData, refetch } = useQuery<GetCurrentOrderQuery>(
    GetCurrentOrderDocument
  );
  const [addItemToOrder] = useMutation<AddItemToOrderMutation>(
    AddItemToOrderDocument
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleBuy = async (productId: string) => {
    try {
      await addItemToOrder({
        variables: { productId, quantity: 1 },
      });
      refetch();
      // TODO: update context here
    } catch (error) {}
  };

  console.log(data);
  return (
    <ProductsGrid>
      {data?.products.items.map(product => (
        <Product key={product.id}>
          <ProductPicture
            src={product?.featuredAsset?.preview}
            alt={product.name}
          />
          <ProductName>{product.name}</ProductName>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>Price: ${product.variants[0].price}</ProductPrice>
          <BuyButton onClick={() => handleBuy(product.id)}> Buy </BuyButton>
        </Product>
      ))}
    </ProductsGrid>
  );
}
