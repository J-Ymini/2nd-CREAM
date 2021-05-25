import React from 'react';
import styled from 'styled-components';

export default function OtherProducts({ products }) {
  return (
    <ProductInfoStyle>
      <ProductImageBackground>
        <ProductImage src={products['main_image']} />
      </ProductImageBackground>
      <ProductInfoContainer>
        <ProductName>{products['english_name']}</ProductName>
        <div>
          <ProductPrice>
            {Math.floor(products['buy_price']).toLocaleString()}
          </ProductPrice>
          <RightNowBuyPrice>즉시 구매가</RightNowBuyPrice>
        </div>
      </ProductInfoContainer>
    </ProductInfoStyle>
  );
}

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 6px;
  height: 74px;
`;

const ProductInfoStyle = styled.div`
  margin: 8px 0 40px 0;
  padding-left: 10px;
  display: inline-block;
  width: 25%;
`;

const ProductImageBackground = styled.div`
  width: 300px;
  height: 300px;
  background-color: #ebf0f4;
  border-radius: 12px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ProductName = styled.p`
  font-size: 14px;
  letter-spacing: 0.2 px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: 900;
  letter-spacing: 0.2 px;
`;

const RightNowBuyPrice = styled.p`
  padding-top: 4px;
  font-size: 12px;
  color: rgba(34, 34, 34, 0.5);
`;
