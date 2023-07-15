import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

jest.mock('../components/Header', () => ({Header: (): JSX.Element => <div>Header</div>}));
jest.mock('../pages/Home', () => ({Home: (): JSX.Element => <div>Home</div>}));
jest.mock('../hooks/useOrderContext', () => ({
  OrderProvider: ({ children }: { children: React.ReactNode }): JSX.Element => <div>{children}</div>,
}));

describe('App', () => {
  it('renders Header', () => {
    render(<App />);
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('renders Home', () => {
    render(<App />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});