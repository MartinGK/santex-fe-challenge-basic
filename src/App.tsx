import React from 'react';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { OrderProvider } from './hooks/useOrderContext';

function App() {
  return (
    <OrderProvider>
      <Header />
      <Home />
    </OrderProvider>
  );
}

export default App;
