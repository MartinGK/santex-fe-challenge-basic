import React from 'react';
import { SantexHeader, Logo, TotalPrice } from './styled/Header';
import { useOrder } from '../hooks/useOrderContext';

export function Header() {
  const { totalPrice } = useOrder();

  return (
    <SantexHeader>
      <Logo
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <TotalPrice>$ {totalPrice}</TotalPrice>
    </SantexHeader>
  );
}
