import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import {
  GetCurrentOrderQuery,
  GetCurrentOrderDocument,
  AddItemToOrderMutation,
  AddItemToOrderDocument,
  AddItemToOrderMutationVariables,
} from '../graphql/generated';

interface OrderContextProps {
  order?: GetCurrentOrderQuery;
  setOrder?: React.Dispatch<
    React.SetStateAction<GetCurrentOrderQuery | undefined>
  >;
  refetchOrders?: () => void;
  addItemToOrder?: (variables: {
    variables: AddItemToOrderMutationVariables;
  }) => void;
}

const OrderContext = createContext<OrderContextProps>({});

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [order = {}, setOrder] = useState<GetCurrentOrderQuery>();

  const [addItemToOrder] = useMutation<AddItemToOrderMutation>(
    AddItemToOrderDocument
  );
  const { data, refetch: refetchOrders } =
    useQuery<GetCurrentOrderQuery>(GetCurrentOrderDocument);

  useEffect(() => {
    if (data) setOrder(data);
  }, [data]);

  return (
    <OrderContext.Provider
      value={{ order, setOrder, refetchOrders, addItemToOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  return useContext(OrderContext);
}
