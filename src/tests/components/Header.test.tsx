import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../../components/Header';
import useStateWithStorage from '../../hooks/useStateWithStorage';

// Mock the useOrder hook
jest.mock('../../hooks/useOrderContext', () => ({
    useOrder: jest.fn().mockReturnValue({
      order: {
        activeOrder: {
          lines: [
            { productVariant: { price: 100 }, quantity: 1 },
            { productVariant: { price: 200 }, quantity: 2 },
          ],
        },
      },
      refetchOrders: jest.fn(),
      addItemToOrder: jest.fn(),
    }),
  }));
  
  // Mock the useStateWithStorage hook
  jest.mock('../../hooks/useStateWithStorage', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue([0, jest.fn()]),
  }));
  
  
describe('Header', () => {
  beforeEach(() => {
    (useStateWithStorage as jest.Mock).mockReturnValue([100]);
  });

  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('displays the total price', () => {
    render(<Header />);
    expect(screen.getByText('$ 100')).toBeInTheDocument();
  });
});
