import React from 'react';
import { SantexHeader, Logo, TotalPrice } from './styled/Header';
import useStateWithStorage from '../hooks/useStateWithStorage';

export function Header() {
  const [totalPrice] = useStateWithStorage({
    key: 'totalPrice',
    defaultValue: 0,
  });

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
