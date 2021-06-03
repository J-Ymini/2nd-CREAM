import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function ProductInfo(props) {
  const { productInfo, sortType } = props;
  const productImage = productInfo[0].product_main_image;
  const brandLogoUrl = productInfo[0].brand_information.brand_logo_url;
  const productName = productInfo[0].product_korean_name;
  const highestBuyPrice = productInfo[0].product_options[0].buy_price;
  const lowestSellPrice = productInfo[0].product_options[0].sell_price;
  const history = useHistory();

  const goToPruductDetail = e => {
    e.preventDefault();
    history.push(`/products/detail/${productInfo[0].product_id}`);
  };

  return (
    <ProductInfoStyle onClick={goToPruductDetail}>
      <ProductImageBackground>
        <ProductImage src={productImage} />
      </ProductImageBackground>
      <LogoAndLike>
        <BrandLogo src={brandLogoUrl} />
        <i class="far fa-bookmark" />
      </LogoAndLike>
      <ProductInfoContainer>
        <ProductName>{productName}</ProductName>
        <div>
          {sortType === 2 ? (
            highestBuyPrice === null ? (
              <ProductPrice>판매 입찰가</ProductPrice>
            ) : (
              <>
                <ProductPrice>{`${Number(
                  highestBuyPrice
                ).toLocaleString()}원`}</ProductPrice>
                <RightNowBuyPrice>즉시 판매가</RightNowBuyPrice>
              </>
            )
          ) : lowestSellPrice === null ? (
            <ProductPrice>구매 입찰가</ProductPrice>
          ) : (
            <>
              <ProductPrice>{`${Number(
                lowestSellPrice
              ).toLocaleString()}원`}</ProductPrice>
              <RightNowBuyPrice>즉시 구매가</RightNowBuyPrice>
            </>
          )}
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
  cursor: pointer;
`;

const ProductImageBackground = styled.div`
  background-color: #ebf0f4;
  border-radius: 12px;
`;

const LogoAndLike = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 10px 10px 0;
  i {
    font-size: 20px;
  }
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
`;
const ProductImage = styled.img`
  width: 234px;
  height: 234px;
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
