//Implement a home page with a grid of products that includes product picture,
//description and price (from any product variant). Hint: use Graphql query.

import React, { useCallback, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GetProductsDocument, GetProductsQuery } from '../graphql/generated';
import {
  ProductsGrid,
  Product,
  ProductPicture,
  ProductDescription,
  ProductPrice,
  ProductName,
  BuyButton,
} from './styled/ProductsList';
import { useOrder } from '../hooks/useOrderContext';
import useStateWithStorage from '../hooks/useStateWithStorage';

export function ProductList() {
  const { loading, error, data } =
    useQuery<GetProductsQuery>(GetProductsDocument);
  const [_, setTotalPrice] = useStateWithStorage({
    key: 'totalPrice',
    defaultValue: 0,
  });

  const { order, refetchOrders, addItemToOrder } = useOrder();

  useEffect(() => {
    const totalPrice = order?.activeOrder?.lines.reduce(
      (acc, cur) => (acc += cur.productVariant.price * cur.quantity),
      0
    );
    if (totalPrice) setTotalPrice(totalPrice);
  }, [order, setTotalPrice]);

  const handleBuy = useCallback(
    async (productId: string) => {
      try {
        if (addItemToOrder && refetchOrders) {
          addItemToOrder({
            variables: { productId, quantity: 1 },
          });
          refetchOrders();
        }
      } catch (error) {}
    },
    [refetchOrders, addItemToOrder]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ProductsGrid>
      {data?.products.items.map((product) => (
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
