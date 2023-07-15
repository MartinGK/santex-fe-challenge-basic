import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  GetCurrentOrderQuery,
  GetCurrentOrderDocument,
  AddItemToOrderMutation,
  AddItemToOrderDocument,
  AddItemToOrderMutationVariables,
} from '../graphql/generated';
import useStateWithStorage from './useStateWithStorage';

interface OrderContextProps {
  order?: GetCurrentOrderQuery;
  totalPrice: Number;
  setOrder?: React.Dispatch<
    React.SetStateAction<GetCurrentOrderQuery | undefined>
  >;
  refetchOrders?: () => void;
  addItemToOrder?: (variables: {
    variables: AddItemToOrderMutationVariables;
  }) => void;
}

const OrderContext = createContext<OrderContextProps>({
  totalPrice: 0,
});
export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [order, setOrder] = useState<GetCurrentOrderQuery>();
  const [totalPrice, setTotalPrice] = useStateWithStorage({
    key: 'totalPrice',
    defaultValue: 0,
  });

  const [addItemToOrder] = useMutation<AddItemToOrderMutation>(
    AddItemToOrderDocument
  );
  const { data, refetch: refetchOrders } = useQuery<GetCurrentOrderQuery>(
    GetCurrentOrderDocument
  );

  const isMounted = useRef(true); 

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (data && isMounted.current) setOrder(data); 
  }, [data]);

  useEffect(() => {
    const totalPrice = order?.activeOrder?.lines.reduce(
      (acc, cur) => (acc += cur.productVariant.price * cur.quantity),
      0
    );
    if (totalPrice && isMounted.current) setTotalPrice(totalPrice); 
  }, [order, setTotalPrice]);

  return (
    <OrderContext.Provider
      value={{ order, totalPrice, setOrder, refetchOrders, addItemToOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}