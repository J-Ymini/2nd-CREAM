import React from 'react';
import styled from 'styled-components';

export default function ProductThumbnail({ eng_title, kor_title, size, img }) {
  return (
    <ProductCard>
      <ProudctImg src={img} />
      <ProductDetail>
        <dt>{kor_title}</dt>
        <dd>{eng_title}</dd>
        <dd>{size}</dd>
      </ProductDetail>
    </ProductCard>
  );
}

const ProductCard = styled.div`
  ${({ theme }) => theme.flexbox('column')}
  margin-right: 30px;
  padding: 32px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 10%);
`;

const ProudctImg = styled.img.attrs(() => ({
  alt: 'productImg',
}))`
  margin-bottom: 12px;
  width: 500px;
  border-radius: 10px;
  background-color: #ebf0f5;
`;

const ProductDetail = styled.dl`
  width: 100%;

  dt {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  dd:nth-child(3) {
    margin: 10px 0 10px;
    color: rgba(34, 34, 34, 0.5);
    font-size: 14px;
  }

  dd:last-child {
    font-weight: bold;
    font-size: 16;
  }
`;
