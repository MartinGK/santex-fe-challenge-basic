import styled from 'styled-components';

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

export const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export const ProductPicture = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

export const ProductDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  flex-grow: 1;
`;

export const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #FF0000;
  font-weight: bold;
  margin: 0.5rem 0;
`;

export const ProductName = styled.h2`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const BuyButton = styled.button`
background-color: #FF0000;
color: #fff;
border: none;
border-radius: 5px;
padding: 0.5rem 1rem;
font-size: 1rem;
cursor: pointer;
transition: background-color 0.3s ease-in-out;

&:hover {
  background-color: #cc0000;
}

&:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}
`;
